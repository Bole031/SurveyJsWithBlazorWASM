//var SurveyHelper = SurveyHelper || {};

//SurveyHelper.ShowSurvey = function (dotNetObject, creatorText) {

//    SurveyCreator.localization.currentLocale = "hr";
//    var creatorOptions = {
//        showLogicTab: true,
//        showJSONEditorTab: true
//    };
//    var creator = new SurveyCreator.SurveyCreator(creatorOptions);
//    creator.render("creatorElement");
//    creator.showToolbox = "left";
//    creator.showPropertyGrid = "right";
//    creator.rightContainerActiveItem("toolbox");

//    //Automatically save survey definition on changing. Hide "Save" button
//    //creator.isAutoSave = true;
//    //Show state button here
//    creator.showState = true;

//    //Setting this callback will make visible the "Save" button
//    creator.saveSurveyFunc = function (saveNo, callback) {
//        //save the survey JSON
//        //console.log(creator.text);
//        //You can store in your database JSON as text: creator.text  or as JSON: creator.JSON

//        dotNetObject.invokeMethodAsync('SaveSurvey', creator.text);

//        //We assume that we can't get error on saving data in local storage
//        //Tells creator that changing (saveNo) saved successfully.
//        //Creator will update the status from Saving to saved
//        callback(saveNo, true);
//    }

//    var defaultJSON = {
//        pages: [
//            {
//                name: 'page1',
//                elements: [
//                    {
//                        type: 'text',
//                        name: "Your First Question.."
//                    }
//                ]
//            }
//        ]
//    };
//    if (!creatorText)
//        creatorText = JSON.stringify(defaultJSON);
//    creator.text = creatorText;

//    //If you get JSON from your database then you can use creator.JSON property
//    //creator.JSON = yourJSON;
//};

var SurveyHelper = SurveyHelper || {};

SurveyHelper.ShowSurvey = function (dotNetObject, creatorText) {
    // Set up SurveyJS creator
    SurveyCreator.localization.currentLocale = "hr";
    var creatorOptions = {
        showLogicTab: true,
        showJSONEditorTab: true,
        showThemeTab: true
    };

    // Define Google Maps widget
    var googleMapsWidget = {
        name: "googlemaps",
        isFit: function (question) {
            // Apply this widget for questions requiring a map, for example, using a specific question type or a custom property.
            // Adjust this condition based on your survey structure.
            return question.getType() == "googlemaps"; // Change "googlemaps" to the appropriate question type or property name.
        },
        isDefaultRender: true,
        afterRender: function (question, el) {
            // This function is executed after the rendering of the Google Maps widget.
            // You can customize the rendering of the widget here.
            var mapContainer = document.createElement("div");
            mapContainer.style.width = "100%";
            mapContainer.style.height = "300px"; // Adjust the height as needed.
            // Replace this with the logic to initialize the Google Maps widget.
            // For example, you would initialize the Google Maps API and add a map to the mapContainer element.
            // Here's a simple example using an embedded iframe (replace with your own logic):
            var mapIframe = document.createElement("iframe");
            mapIframe.setAttribute("src", "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2793.750247780346!2d18.69224237759898!3d45.55534947107548!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x475ce7b768a4ad8f%3A0x3ee3cc1d29e927f3!2sEurodom%20Osijek%2C%2031000%2C%20Tvr%C4%91a%2C%20Osijek");
            mapIframe.setAttribute("width", "100%");
            mapIframe.setAttribute("height", "100%");
            mapIframe.setAttribute("frameborder", "0");
            mapIframe.setAttribute("style", "border:0;");
            mapIframe.setAttribute("allowfullscreen", "");
            mapIframe.setAttribute("loading", "lazy");
            mapIframe.setAttribute("referrerpolicy", "no-referrer-when-downgrade");
            mapContainer.appendChild(mapIframe);
            el.appendChild(mapContainer);
        },
    };

    var creator = new SurveyCreator.SurveyCreator(creatorOptions);
    creator.render("creatorElement");
    creator.showToolbox = "left";
    creator.showPropertyGrid = "right";
    creator.rightContainerActiveItem("toolbox");

    //Automatically save survey definition on changing. Hide "Save" button
    //creator.isAutoSave = true;
    //Show state button here
    creator.showState = true;

    //Setting this callback will make visible the "Save" button
    creator.saveSurveyFunc = function (saveNo, callback) {
        //save the survey JSON
        //console.log(creator.text);
        //You can store in your database JSON as text: creator.text  or as JSON: creator.JSON
        dotNetObject.invokeMethodAsync('SaveSurvey', creator.text);
        //We assume that we can't get error on saving data in local storage
        //Tells creator that changing (saveNo) saved successfully.
        //Creator will update the status from Saving to saved
        callback(saveNo, true);
    }

    

    // Register the Google Maps widget
    Survey.CustomWidgetCollection.Instance.add(googleMapsWidget);

    // Load the default JSON or the provided JSON
    var defaultJSON = {
        pages: [{
            name: 'page1',
            elements: [{
                type: 'text',
                name: "Your First Question.."
            }]
        }]
    };
    if (!creatorText)
        creatorText = JSON.stringify(defaultJSON);
    creator.text = creatorText;
};