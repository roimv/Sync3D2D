require([
  "esri/WebMap",
  "esri/WebScene",
  "esri/views/MapView",
  "esri/views/SceneView",
  "esri/core/watchUtils",
  "esri/widgets/Locate",
  "esri/widgets/Search",
  "esri/widgets/Legend",
  "esri/Graphic",
  "esri/layers/GraphicsLayer",
  "esri/geometry/Point",
  "esri/geometry/Polygon",
  "esri/geometry/geometryEngine",
  "esri/tasks/support/Query",
  "esri/layers/FeatureLayer",
  "esri/widgets/Sketch/SketchViewModel",
  "esri/views/layers/support/FeatureFilter"


], function(
  WebMap,
  WebScene,
  MapView, SceneView,
  watchUtils,
  Locate,
  Search,
  Legend,
  Graphic,
  GraphicsLayer,
  Point,
  Polygon,
  geometryEngine,
  Query,
  FeatureLayer,
  SketchViewModel,
  FeatureFilter
) {


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

  var bufferLayer = new GraphicsLayer();
  view2.map.add(bufferLayer);




  // Cargar las vistas
  view1.when(function() {
    capa3D = webscene.findLayerById('1695d04df21-layer-1');
    capa2D = webmap.findLayerById('PuntosCalp_Grupos_9989');

    memoriaExpresion = {
      logica: true,
      expresion: ""
    }

    var ocioDOM = document.getElementById('botonAccionOcio');
    ocioDOM.onclick = function() {

      cadenaClasesOcio = ocioDOM.className;

      if (cadenaClasesOcio.indexOf('activado') == -1) {
        ocioDOM.classList.add("activado");
        console.log(ocioDOM.classList);
        if (memoriaExpresion.expresion == "") {

          memoriaExpresion.logica = false;
          memoriaExpresion.expresion = "Grupo = 'Ocio'";
          diccionarioJSON.push("Grupo = 'Ocio'");
        } else {
          memoriaExpresion.logica = false;
          memoriaExpresion.expresion = "AND Grupo = 'Ocio'";
          diccionarioJSON.push("AND Grupo = 'Ocio'");
        }
        capa2D.definitionExpression = diccionarioJSON;
        capa3D.definitionExpression = diccionarioJSON;

      } else {
        ocioDOM.classList.remove("activado");
        console.log(ocioDOM.classList);
        if (memoriaExpresion.expresion = "Grupo = 'Ocio'") {
          memoriaExpresion.logica == true;
          memoriaExpresion.expresion = "";
          diccionarioJSON.pop("Grupo = 'Ocio'");
          capa2D.definitionExpression = diccionarioJSON;
          capa3D.definitionExpression = diccionarioJSON;
        } else {
          memoriaExpresion.logica == false;
          memoriaExpresion.expresion = "AND Grupo = 'Ocio'";
          diccionarioJSON.pop("AND Grupo = 'Ocio'");
          capa2D.definitionExpression = diccionarioJSON;
          capa3D.definitionExpression = diccionarioJSON;
        }
      }
    };

    var turismoDOM = document.getElementById('botonAccionTurismos');
    turismoDOM.onclick = function() {
      cadenaClasesTurismo = turismoDOM.className;

      if (cadenaClasesTurismo.indexOf('activado') == -1) {
        turismoDOM.classList.add("activado");
        console.log(turismoDOM.classList);
        if (memoriaExpresion.expresion == "") {
          memoriaExpresion.logica = false;
          memoriaExpresion.expresion = "Grupo = 'Turismos'";
          diccionarioJSON.push("Grupo = 'Turismos'");
        } else {
          memoriaExpresion.logica = false;
          memoriaExpresion.expresion = "AND Grupo = 'Turismos'";
          diccionarioJSON.push("AND Grupo = 'Turismos'");
        }
        capa2D.definitionExpression = diccionarioJSON;
        capa3D.definitionExpression = diccionarioJSON;

      } else {
        turismoDOM.classList.remove("activado");
        console.log(turismoDOM.classList);
        if (memoriaExpresion.expresion = "Grupo = 'Turismos'") {
          memoriaExpresion.logica == true;
          memoriaExpresion.expresion = "";
          diccionarioJSON.pop("Grupo = 'Turismos'");
          capa2D.definitionExpression = diccionarioJSON;
          capa3D.definitionExpression = diccionarioJSON;
        } else {
          memoriaExpresion.logica == false;
          memoriaExpresion.expresion = "AND Grupo = 'Turismos'";
          diccionarioJSON.pop("AND Grupo = 'Turismos'");
          capa2D.definitionExpression = diccionarioJSON;
          capa3D.definitionExpression = diccionarioJSON;
        }
      }
    };

    var serviciosDOM = document.getElementById('botonAccionServicios');
    serviciosDOM.onclick = function() {

      cadenaClasesServicios = serviciosDOM.className;

      if (cadenaClasesServicios.indexOf('activado') == -1) {
        serviciosDOM.classList.add("activado");
        console.log(serviciosDOM.classList);
        if (memoriaExpresion.expresion == "") {
          memoriaExpresion.logica = false;
          memoriaExpresion.expresion = "Grupo = 'Servicios'";
          diccionarioJSON.push("Grupo = 'Servicios'");
        } else {
          memoriaExpresion.logica = false;
          memoriaExpresion.expresion = "AND Grupo = 'Servicios'";
          diccionarioJSON.push("AND Grupo = 'Servicios'");
        }
        capa2D.definitionExpression = diccionarioJSON;
        capa3D.definitionExpression = diccionarioJSON;

      } else {
        serviciosDOM.classList.remove("activado");
        console.log(serviciosDOM.classList);
        if (memoriaExpresion.expresion = "Grupo = 'Servicios'") {
          memoriaExpresion.logica == true;
          memoriaExpresion.expresion = "";
          diccionarioJSON.pop("Grupo = 'Servicios'");
          capa2D.definitionExpression = diccionarioJSON;
          capa3D.definitionExpression = diccionarioJSON;
        } else {
          memoriaExpresion.logica == false;
          memoriaExpresion.expresion = "AND Grupo = 'Servicios'";
          diccionarioJSON.pop("AND Grupo = 'Servicios'");
          capa2D.definitionExpression = diccionarioJSON;
          capa3D.definitionExpression = diccionarioJSON;
        }
      }
    };

    var alojamientoDOM = document.getElementById('botonAccionAlojamiento');
    alojamientoDOM.onclick = function() {

      cadenaClasesAlojamiento = alojamientoDOM.className;

      if (cadenaClasesAlojamiento.indexOf('activado') == -1) {
        alojamientoDOM.classList.add("activado");
        console.log(alojamientoDOM.classList);
        if (memoriaExpresion.expresion == "") {
          memoriaExpresion.logica = false;
          memoriaExpresion.expresion = "Grupo = 'Alojamiento'";
          diccionarioJSON.push("Grupo = 'Alojamiento'");
        } else {
          memoriaExpresion.logica = false;
          memoriaExpresion.expresion = "AND Grupo = 'Alojamiento'";
          diccionarioJSON.push("AND Grupo = 'Alojamiento'");
        }
        capa2D.definitionExpression = diccionarioJSON;
        capa3D.definitionExpression = diccionarioJSON;

      } else {
        alojamientoDOM.classList.remove("activado");
        console.log(alojamientoDOM.classList);
        if (memoriaExpresion.expresion = "Grupo = 'Alojamiento'") {
          memoriaExpresion.logica == true;
          memoriaExpresion.expresion = "";
          diccionarioJSON.pop("Grupo = 'Alojamiento'");
          capa2D.definitionExpression = diccionarioJSON;
          capa3D.definitionExpression = diccionarioJSON;
        } else {
          memoriaExpresion.logica == false;
          memoriaExpresion.expresion = "AND Grupo = 'Alojamiento'";
          diccionarioJSON.pop("AND Grupo = 'Alojamiento'");
          capa2D.definitionExpression = diccionarioJSON;
          capa3D.definitionExpression = diccionarioJSON;
        }
      }
    };

    var restaurantesDOM = document.getElementById('botonAccionRestaurantes');
    restaurantesDOM.onclick = function() {


      cadenaClasesRestaurantes = restaurantesDOM.className;

      if (cadenaClasesRestaurantes.indexOf('activado') == -1) {
        restaurantesDOM.classList.add("activado");
        console.log(restaurantesDOM.classList);
        if (memoriaExpresion.expresion == "") {
          memoriaExpresion.logica = false;
          memoriaExpresion.expresion = "Grupo = 'Restaurantes'";
          diccionarioJSON.push("Grupo = 'Restaurantes'");
        } else {
          memoriaExpresion.logica = false;
          memoriaExpresion.expresion = "AND Grupo = 'Restaurantes'";
          diccionarioJSON.push("AND Grupo = 'Restaurantes'");
        }
        capa2D.definitionExpression = diccionarioJSON;
        capa3D.definitionExpression = diccionarioJSON;

      } else {
        restaurantesDOM.classList.remove("activado");
        console.log(alojamientoDOM.classList);
        if (memoriaExpresion.expresion = "Grupo = 'Restaurantes'") {
          memoriaExpresion.logica == true;
          memoriaExpresion.expresion = "";
          diccionarioJSON.pop("Grupo = 'Restaurantes'");
          capa2D.definitionExpression = diccionarioJSON;
          capa3D.definitionExpression = diccionarioJSON;
        } else {
          memoriaExpresion.logica == false;
          memoriaExpresion.expresion = "AND Grupo = 'Restaurantes'";
          diccionarioJSON.pop("AND Grupo = 'Restaurantes'");
          capa2D.definitionExpression = diccionarioJSON;
          capa3D.definitionExpression = diccionarioJSON;
        }
      }
    };


    var locateBtn = new Locate({
      view: view1
    });
    view1.ui.add(locateBtn, {
      position: "top-left"
    });


    var searchWidget = new Search({
      view: view1
    });

    view1.ui.add(searchWidget, {
      position: "top-right",
      index: 2
    });


    //buffer del punto que incluya el usuario

    view2.on("click", function(event) {
      bufferLayer.removeAll()
      var punto = new Graphic({
        geometry: event.mapPoint,
        symbol: {
          type: "simple-marker",
          color: [240, 230, 140, ],
          size: 8
        }
      });

      bufferLayer.graphics.add(punto);

      var evtPunto = event.mapPoint
      evtPunto.hasZ = false;
      evtPunto.z = undefined;

      var distanceSlider = document.getElementById("distance");
      var bufferDistance = parseInt(distanceSlider.value);

      var buffer = geometryEngine.buffer(evtPunto, [bufferDistance], "meters");
      var circulo = {
        type: "simple-fill",
        color: [240, 230, 140, 0.4],
        outline: {
          color: [122, 153, 172, 0.2],
          width: 2
        }
      };

      bufferLayer.add(new Graphic({
        geometry: buffer,
        symbol: circulo
      }));

      distanceSlider.addEventListener("input", function() {
        document.getElementById("distance-value").innerText = distanceSlider.value;
      });



      var listaFeatures = [];
      var listaAtributos = [];

      var query = capa2D.createQuery();
      query.geometry = buffer;
      query.spatialRelationship = "contains";
      query.returnGeometry = true;
      query.outFields = ["OBJECTID"];
      capa2D.queryFeatures(query)
        .then(function(response) {
          var listaFeatures = response.features; // Aquí tengo un array de elementos, con las features de cada elemento seleccionado en el mapa

          for (ele of listaFeatures) {
            var id = ele.attributes;
            listaAtributos.push(id);

            if (listaAtributos.indexOf(id) == -1) {
              listaAtributos = capa2D.definitionExpression;
            }
          };
          console.log(listaAtributos);





        });


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

  var leyenda = new Legend({
    view: view2
  });
  view2.ui.add(leyenda);



});
