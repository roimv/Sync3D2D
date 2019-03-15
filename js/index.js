require([
  "esri/WebMap",
  "esri/WebScene",
  "esri/views/MapView",
  "esri/views/SceneView",
  "esri/core/watchUtils",
  "esri/widgets/Locate",
  "esri/widgets/Legend"

], function(
  WebMap,
  WebScene,
  MapView, SceneView,
  watchUtils,
  Locate,
  Legend
) {

  var expresionGlobal = "";
  var diccionarioJSON = [];

  var webmap = new WebMap({
    portalItem: {
      id: "0ca818c1674e4403937ef94e0e196c0d"
    }
  });

  var webscene = new WebScene({
    portalItem: {
      id: "bba7fb45bfa149d69695ec5762a7f317"
    }
  });

  var view1 = new SceneView({
    id: 'view1',
    container: 'view1Div',
    map: webscene
  });

  var view2 = new MapView({
    id: 'view2',
    container: 'view2Div',
    map: webmap,
    constraints: {
      // Desactivado el zoom para mejorar la sincronización
      snapToZoom: false
    }
  });

  // Cargar las vistas
  view1.when(function() {
    capa3D = webscene.findLayerById('1695d04df21-layer-1');
    capa2D = webmap.findLayerById('PuntosCalp_Grupos_9989');



    var ocioDOM = document.getElementById('botonAccionOcio');
    ocioDOM.onclick = function() {

      cadena = ocioDOM.className;

        memoriaExpresion = {

            logica: true,
            expresion:""
        }



        if (cadena.indexOf('activado') == -1) {
          ocioDOM.classList.add("activado");
          if (expresionGlobal == "") {
            expresionGlobal = expresionGlobal + "Grupo = 'Ocio'";

            memoriaExpresion.logica= false;
            memoriaExpresion.expresion = "Grupo = 'Ocio'";
            diccionarioJSON.push(memoriaExpresion);
          } else {
            expresionGlobal = expresionGlobal + " and Grupo = 'Ocio'";
          }
          capa2D.definitionExpression = expresionGlobal;
          capa3D.definitionExpression = expresionGlobal;

        } else {
          ocioDOM.classList.remove("activado");
          aux = expresionGlobal.replace("Grupo = 'Ocio'", "");
          capa2D.definitionExpression = aux;
          capa3D.definitionExpression = aux;
        }

    };





    var turismoDOM = document.getElementById('botonAccionTurismos');
    turismoDOM.onclick = function() {
      capa2D.definitionExpression = "Grupo = 'Turismos'";
      capa3D.definitionExpression = "Grupo = 'Turismos'";
    };

    var serviciosDOM = document.getElementById('botonAccionServicios');
    serviciosDOM.onclick = function() {
      capa2D.definitionExpression = "Grupo = 'Servicios'";
      capa3D.definitionExpression = "Grupo = 'Servicios'";
    };

    var alojamientoDOM = document.getElementById('botonAccionAlojamiento');
    alojamientoDOM.onclick = function() {
      capa2D.definitionExpression = "Grupo = 'Alojamiento'";
      capa3D.definitionExpression = "Grupo = 'Alojamiento'";
    };

    var restaurantesDOM = document.getElementById('botonAccionRestaurantes');
    restaurantesDOM.onclick = function() {
      capa2D.definitionExpression = "Grupo = 'Restaurantes'";
      capa3D.definitionExpression = "Grupo = 'Restaurantes'";
    };

    var locateBtn = new Locate({
      view: view1
    });
    view1.ui.add(locateBtn, {
      position: "top-left"
    });

  });



  var synchronizeView = function(view, others) {
    others = Array.isArray(others) ? others : [others];

    var viewpointWatchHandle;
    var viewStationaryHandle;
    var otherInteractHandlers;
    var scheduleId;

    var clear = function() {
      if (otherInteractHandlers) {
        otherInteractHandlers.forEach(function(handle) {
          handle.remove();
        });
      }
      viewpointWatchHandle && viewpointWatchHandle.remove();
      viewStationaryHandle && viewStationaryHandle.remove();
      scheduleId && clearTimeout(scheduleId);
      otherInteractHandlers = viewpointWatchHandle =
        viewStationaryHandle = scheduleId = null;
    };

    var interactWatcher = view.watch('interacting,animation',
      function(newValue) {
        if (!newValue) {
          return;
        }
        if (viewpointWatchHandle || scheduleId) {
          return;
        }

        // start updating the other views at the next frame
        scheduleId = setTimeout(function() {
          scheduleId = null;
          viewpointWatchHandle = view.watch('viewpoint',
            function(newValue) {
              others.forEach(function(otherView) {
                otherView.viewpoint = newValue;
              });
            });
        }, 0);

        // stop as soon as another view starts interacting, like if the user starts panning
        otherInteractHandlers = others.map(function(otherView) {
          return watchUtils.watch(otherView,
            'interacting,animation',
            function(
              value) {
              if (value) {
                clear();
              }
            });
        });

        // or stop when the view is stationary again
        viewStationaryHandle = watchUtils.whenTrue(view,
          'stationary', clear);
      });

    return {
      remove: function() {
        this.remove = function() {};
        clear();
        interactWatcher.remove();
      }
    }
  };

  /**
   * utility method that synchronizes the viewpoints of multiple views
   */
  var synchronizeViews = function(views) {
    var handles = views.map(function(view, idx, views) {
      var others = views.concat();
      others.splice(idx, 1);
      return synchronizeView(view, others);
    });

    return {
      remove: function() {
        this.remove = function() {};
        handles.forEach(function(h) {
          h.remove();
        });
        handles = null;
      }
    }
  }

  // vinculación de vistas
  synchronizeViews([view1, view2]);

});
