/**********************************************************************************
    props.js


    Key Code Reference Tags:
         -  #library_constructor                 🔨🔨 [LIBRARY] CONSTRUCTOR 🔨🔨
         -  #props_add_prop_method
         -  #props_display_panel_method
         -  #set_main_props_method
         -  #props_add_event_listener            {Custom} [Property Panel] Level EVENT HANDLER!
         -  #run_change_event_handlers
         -  #props_clean_up
         -  #props_add_prop_method               📌ADD PROPERTY METHOD!

         -  #props_display_panel_method          Build Markup and display panel in 
                                                 Browser. 🖍🖍🖍
        
         -  #private_functions
         -  #build_prop_style_block              🖼🖼 CSS Styles 🖼🖼
         -  #build_Props_Style_Unselectable
         -  #create_prop_constructor             🔨🔨 [PROPERTY] OBJECT CONSTRUCTOR 🔨🔨
         -  #property_obj_custom_prop_def        CUSTOM PROPERTIES (property obj)
         -  #data_idx
         -  #prop_id
         -  #prop_setup_color_change             set up event listener for value change of 'color' input tag
         -  #color_changed
         -  #prop_add_event_listener_method      {PROPERTY} Level Custom event listener for devs to use
         -  #run_prop_level_change_event_handlers

         -  #prop_sel_prop_method                SELECT PROPERTY
         -  #prop_de_sel_prop_method             DE-SELECT PROPERTY

         -  #drop_down_toggle                    Builds/Shows/ and Hides selection dropdown list! 🔨👀❌
         -  #proc_prop_option_selected           User selected option in selection dropdown list
         -  #prop_commit_changes_method
         -  #prop_begin_edit_method
         -  #text_box_handle_keydown
         -  #text_box_handle_keyup
         -  #prop_toggle_prop_value              Toggle Property value on Double Click!
         -  #get_option_set_caption

         -  #prop_markup_method                  Generate HTML markup for [Property] on panel   🖍🖍🖍
         -  #get_color_value_markup

         -  #prop_container_event_listeners      👂CONTAINER EVENT LISTENERS👂
         -  #props_click
         -  #props_dbl_click
         -  #get_val                             GET VAL function!
         -




 
 **********************************************************************************/



/*************************************************************************
 *  Constructor for Library
 *  #library_constructor
 *************************************************************************/ 
function OrvProps(siContainerId) {
    const sContainerId = siContainerId;
    const containerNd = document.getElementById(sContainerId)
    const props = this;
    let propsByIndex = [];
    let mainPropsObj;
    let nLastSelectedPropIndex = -1;

    let swatchIdListByIndex = [];
    let changeEventHandlers = [];

    const ESC_KEY = 27;
    const ENTER_KEY = 13;
    const BACKSPACE_KEY = 8;
    const LEFTARROW_KEY = 37;
    const RIGHTARROW_KEY = 39
    const HOME_KEY = 36;
    const END_KEY = 35;
    const INSERT_KEY = 45;
    const TAB_KEY = 9;
    const SHIFT_KEY = 16;
    const CTRL_KEY = 17;
    const CMD_KEY = 93;
    


   /********************************************************************************
    * 
    *   #props_clear_method
    ********************************************************************************/ 
    props.clear = function() {
        propsByIndex = [];
    } // end of props.clear() method




  /********************************************************************************
   * 
   *   #set_main_props_method
   ********************************************************************************/ 
   props.setMainPropsObj = function(newMainPropsObj) {
        mainPropsObj = newMainPropsObj;
   } // end of props.clear() method





  /********************************************************************************
   * 
   *   #props_add_event_listener
   * 
   *   all dev to add event listeners at the property panel level
   ********************************************************************************/    
   props.addEventListener = function(sEvent, functToRun) {
       const eventInfoObj = {};
       eventInfoObj.event = sEvent;
       eventInfoObj.functToRun = functToRun;

       // event to fire when property value changes:       
       if (sEvent === "change" && typeof functToRun === "function") {
            changeEventHandlers.push(eventInfoObj)
       } // end if

   } // end of props.addEventListener() method




  /********************************************************************************
   * 
   *   #run_change_event_handlers
   ********************************************************************************/     
   function runChangeEventHandlers(propertyObj,vOldValue,vNewValue) {
       const nMax = changeEventHandlers.length;

       for (let n=0; n< nMax; n++) {           
           eventInfoObj = changeEventHandlers[n]
           const funcToRun = eventInfoObj.functToRun;
           customEventObj = {};
           customEventObj.event = "change"
           customEventObj.level = "panel"
           customEventObj.timestamp = new Date();
           customEventObj.propertyObj = propertyObj;
           customEventObj.oldValue = vOldValue;
           customEventObj.newValue = vNewValue;
           funcToRun(customEventObj);
       } // next n

   } // end of function runChangeEventHandlers()




 /********************************************************************************
  * 
  *   #props_clean_up
  * 
  *   Call this Before removing a property panel from the page...
  *   (If you are not just leaving the page)
  * 
  *   This includes removing any event listeners that need removing.
  ********************************************************************************/ 
  props.cleanUp = function() {
      console.log("props.cleanUp() method called")
      containerNd.removeEventListener("click", propsClick);
      containerNd.removeEventListener("dblclick", propsDblClick);
  } // end of props.cleanUp() method




   /********************************************************************************
    * 
    *   #props_add_prop_method
    ********************************************************************************/ 
    props.addProp = function(params) {
        console.log("props.addProp() method called")
        params.indexNum = propsByIndex.length;
        const prop = new CreateProp(params);
        propsByIndex.push(prop);
        return prop;
    } // end of props.addProp() method




   /********************************************************************************
    * 
    *   #props_display_panel_method
    ********************************************************************************/ 
    props.displayPanel = function() {
        const s=[];

        swatchIdListByIndex = [];

        s.push("<div class='orvPropsTitlebar'>")
        s.push("<div class='orvPropsTitlebarCaption'>")
        s.push("Properties</div></div>")

        s.push("<div id='orvPropsListCntr'>");

        const nMax = propsByIndex.length;

        s.push("<ul class='orvPropsList'>");
        for (let n=0;n<nMax;n++) {
            const prop = propsByIndex[n]
            s.push(prop.markup())
        } // next n

        s.push("</ul>"); // orvPropsList

        s.push("</div>"); // orvPropsListCntr

        s.push("<div class='orvPropDescPanel'>")
        s.push("<div class='orvPropDescPanelInset'>")

        s.push("<div id='orvPropDescPanelTitle'></div>")
        s.push("<div id='orvPropDescPanelDetails'></div>")
        

        s.push("</div>"); // orvPropDescPanelInset
        s.push("</div>"); // orvPropDescPanel

        containerNd.innerHTML = s.join("");

        const nMax2 = swatchIdListByIndex.length;
        if (nMax2>0) {
            for (let n=0;n<nMax2;n++) {
                const prop = swatchIdListByIndex[n]
                prop.setupColorChange();
            } // next n

        } // end if

    } // end of props.displayPanel() method
    // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@



    const STYLE_BLOCK_ID = "orvPropStyles";
    let styleBlockNd = document.getElementById(STYLE_BLOCK_ID);

    if (styleBlockNd === null) {
        buildPropStyleBlock();
    } // end if


    // ######### PRIVATE FUNCTIONS ######################
    // #private_functions

   /********************************************************************************
    * 
    *   #build_prop_style_block
    ********************************************************************************/        
    function buildPropStyleBlock() {
        styleBlockNd = document.createElement("style");
        styleBlockNd.id = STYLE_BLOCK_ID;
        const s = [];

        s.push(".orvPropsTitlebar {");
        s.push("  box-sizing: border-box;");
        s.push("  overflow:hidden;");
        s.push("  position:absolute;");
        s.push("  background: #E5E5E5;");
        s.push("  border-bottom:solid silver .5px;");
        s.push("  left:0px;");
        s.push("  right:0px;");
        s.push("  top:0px;");
        s.push("  height:18px;");
        s.push(buildPropsStyleUnselectable());
        s.push("}");

        s.push(".orvPropsTitlebarCaption {");
        s.push("  box-sizing: border-box;");
        s.push("  overflow:hidden;");
        s.push("  position:absolute;");
        s.push("  top:1px;");
        s.push("  margin:0px;");
        s.push("  padding:0px;");
        s.push("  left:5px;");
        s.push("  right:5px;");   
        s.push("  text-align:center;");        
        s.push("  color: #616161;");
        s.push("  font-family: tahoma;");
        s.push("  font-size: 13px;");
        s.push("  text-height: 18px;");
        s.push("}");

        s.push("#orvPropsListCntr {");
        s.push("  box-sizing: border-box;");
        s.push("  overflow-x:hidden;");
        s.push("  overflow-y:auto;");
        s.push("  position:absolute;");
        s.push("  margin:0px;");
        s.push("  padding:0px;");
        s.push("  top:18px;");
        s.push("  left:0px;");
        s.push("  right:0px;");
        s.push("  bottom:80px;");
        s.push("  background:white;");
        s.push("  box-shadow: -5px 5px 3px #888888;");
        s.push("}");

        s.push(".orvPropsList {");
        s.push("  list-style-type: none;");
        s.push("  margin:0px;");
        s.push("  padding:0px;");
        s.push("}");

        //orvPropLi
        s.push(".orvPropLi {");
        s.push("  margin:0px;");
        s.push("  padding:0px;");
        s.push("}");


        s.push(".orvProp {");
        s.push("  box-sizing: border-box;");
        s.push("  overflow:hidden;");
        s.push("  position:relative;");
        s.push("  top:0px;");
        s.push("  left:0px;");
        s.push("  right:0px;");
        s.push("  height:18px;");
        s.push("  border-bottom:solid silver .5px;");
        s.push("  font-family: tahoma;");
        s.push("  font-size: 13px;");
        s.push("  text-height: 18px;");
        s.push("  background: white;");
        s.push("  color: #616161;");
        s.push("}");


        s.push(".orvPropDropdownButton {");
        s.push("  box-sizing: border-box;");
        s.push("  padding:0px;");
        s.push("  margin:0px;");
        s.push("  height:19px;");
        s.push("  width:19px;");
        s.push("  position:absolute;");
        s.push("  top:-1px;");
        s.push("  right:3px;");
        s.push("  z-index:10px;");
        s.push("  background: #E5E5E5;");
        s.push("  border:solid silver .5px;");
        s.push(buildPropsStyleUnselectable());
        s.push("}");

        //orvPropDropdownList
        s.push(".orvPropDropdownList {");
        s.push("  box-sizing: border-box;");
        s.push("  position:absolute;");
        s.push("  overflow-x:hidden;");
        s.push("  overflow-y:auto;");
        s.push("  margin:0px;");
        s.push("  z-index:11px;");
        s.push("  background: white;");
        s.push("  border:solid gray .5px;");
        s.push("  width:51%;");
        s.push(buildPropsStyleUnselectable());
        s.push("}");

        s.push(".orvPropDropdownListItm {");
        s.push("  font-family: tahoma;");
        s.push("  font-size: 13px;");
        s.push("  text-height: 18px;");
        s.push("  color: #616161;");
        s.push("}");

        s.push(".orvPropDropdownListHdr {");
        s.push("  font-family: tahoma;");
        s.push("  font-size: 10px;");
        s.push("  padding-left: 3px;");
        s.push("  text-height: 12px;");
        s.push("  height: 12px;");
        s.push("  background:#abb1d4;");
        s.push("  color: white;");
        s.push("  text-shadow: -1px 1px #454f87;");
        s.push("}");

        s.push(".orvPropDropdownListItmSel {");
        s.push("  font-family: tahoma;");
        s.push("  font-size: 13px;");
        s.push("  text-height: 18px;");
        s.push("  background:#E4E6F1;");
        s.push("}");

        s.push(".orvColorOptContnr {");
        s.push("  position:relative;");
        s.push("  left: 0px;");
        s.push("  right: 0px;");
        s.push("  top: 0px;");
        s.push("  height: 18px;");
        s.push("  padding: 0px;");
        s.push("  overflow:hidden;");
        s.push("}");

        s.push(".orvColorOptSwatch {");
        s.push("  position:absolute;");
        s.push("  left: 4px;");
        s.push("  top: 3px;");
        s.push("  width: 11px;");
        s.push("  height: 11px;");
        s.push("  border:solid silver .5px;");
        s.push("  border-radius:3px;");
        s.push("}");        

        s.push(".orvColorOptCaption {");
        s.push("  position:absolute;");
        s.push("  box-sizing: border-box;");        
        s.push("  left: 20px;");
        s.push("  top: 0px;");
        s.push("  right: 0px;");
        s.push("  height: 18px;");
        s.push("  color: #990000;");
        s.push("  overflow:hidden;");
        s.push("}");

        s.push(".orvPropName {");
        s.push("  padding-left:2px;");
        s.push("  width:49%;");
        s.push("  border-right:solid silver .5px;");
        s.push(buildPropsStyleUnselectable());
        s.push("}");

        s.push(".orvPropNameSel {");
        s.push("  margin:0px;");
        s.push("  padding-left:2px;");
        s.push("  width:49%;");
        s.push("  background:#E4E6F1;");
        s.push("  border-right:solid silver .5px;");
        s.push(buildPropsStyleUnselectable());
        s.push("}");

        s.push(".orvPropValue {");
        s.push("  position:absolute;");
        s.push("  top:0px;");
        s.push("  left:50%;");
        s.push("  padding-left:3px;");
        s.push("  right:0px;");
        s.push("}");

        s.push(".orvPropValueTextBox {");
        s.push("  box-sizing: border-box;");
        s.push("  position:absolute;");
        s.push("  top:0px;");
        s.push("  left:0px;");
        s.push("  bottom:0px;");
        s.push("  right:0px;");
        s.push("  border-style:none;");
        s.push("  border-width:0px;");
        s.push("  outline: none;");        
        s.push("  font-family: tahoma;");
        s.push("  font-size: 13px;");
        s.push("  height:18px;");
        s.push("  text-height: 18px;");
        s.push("  color: #616161;");
        s.push("}");        

        s.push(".orvPropSwatch {");
        s.push("  position:absolute;");
        s.push("  top:1px;");
        s.push("  left:2px;");
        s.push("  width:12px;");
        s.push("  height:12px;");
        s.push("  border:solid silver .5px;");
        s.push("  border-radius:3px;");
        s.push("}");

        s.push(".orvPropInpSwatch {");
        s.push("  position:absolute;");
        s.push("  box-sizing: border-box;");
        s.push("  padding:0px;");
        s.push("  margin:0px;");
        s.push("  border:none;");
        s.push("  top:-4px;");
        s.push("  left:2px;");
        s.push("  height:25px;");
        s.push("  width:25px;");
        s.push("  overflow:hidden;");
        s.push("}");

        s.push(".orvPropColorCode {");
        s.push("  position:absolute;");
        s.push("  box-sizing: border-box;");
        s.push("  padding: 0px;");
        s.push("  margin: 0px;");
        s.push("  top:0px;");
        s.push("  left:20px;");
        s.push("  right:2px;");
        s.push("  height:18px;");
        s.push("  text-height: 18px;");
        s.push("  color: #990000;");
        s.push("}");

        s.push(".orvPropColorCode2 {");
        s.push("  position:absolute;");
        s.push("  box-sizing: border-box;");
        s.push("  padding: 0px;");
        s.push("  margin: 0px;");
        s.push("  top:0px;");
        s.push("  left:30px;");
        s.push("  right:2px;");
        s.push("  height:18px;");
        s.push("  text-height: 18px;");
        s.push("  color: #990000;");
        s.push("}");

        s.push(".orvPropDescPanel {");
        s.push("  position:absolute;");
        s.push("  box-sizing: border-box;");
        s.push("  left:0px;");
        s.push("  right:0px;");
        s.push("  bottom:0px;");
        s.push("  height:80px;");
        s.push("  padding:0px;");
        s.push("  background:#E5E5E5;");
        s.push("  border-top:solid silver .5px;");
        s.push("}");

        s.push(".orvPropDescPanelInset {");
        s.push("  position:absolute;");
        s.push("  box-sizing: border-box;");
        s.push("  margin:0px;");
        s.push("  left:4px;");
        s.push("  right:4px;");
        s.push("  bottom:4px;");
        s.push("  top:4px;");
        s.push("  bottom:4px;");
        s.push("  border:solid silver .5px;");
        s.push("}");

        s.push("#orvPropDescPanelTitle {");
        s.push("  position:absolute;");
        s.push("  box-sizing: border-box;");
        s.push("  left:2px;");
        s.push("  right:2px;");
        s.push("  top:2px;");
        s.push("  font-family: tahoma;");
        s.push("  font-size: 13px;");
        s.push("  text-height: 18px;");
        s.push("  height: 18px;");
        s.push("  color:black;");
        s.push("  overflow:hidden;");
        s.push("  text-overflow: ellipsis;");
        s.push("}");

        s.push("#orvPropDescPanelDetails {");
        s.push("  position:absolute;");
        s.push("  box-sizing: border-box;");
        s.push("  left:2px;");
        s.push("  right:2px;");
        s.push("  top:25px;");
        s.push("  bottom:2px;");
        s.push("  font-family: tahoma;");
        s.push("  font-size: 13px;");
        s.push("  text-height: 15px;");
        s.push("  color: #616161;");
        s.push("  overflow:hidden;");
        s.push("  text-overflow: ellipsis;");
        s.push("}");

        styleBlockNd.innerHTML = s.join("");
        document.body.appendChild(styleBlockNd);
    } // end of function buildPropStyleBlock()


   /********************************************************************************
    * 
    *   #build_Props_Style_Unselectable
    ********************************************************************************/    
   function buildPropsStyleUnselectable() {
    const s=[];
    s.push("user-select: none;");
    s.push("-moz-user-select: none;");
    s.push("-khtml-user-select: none;");
    s.push("-webkit-user-select: none;");
    s.push("-o-user-select: none;");
    
    return s.join("");
} // end of function buildPropsStyleUnselectable()    




/********************************************************************************
 * 
 *   #create_prop_constructor
 ********************************************************************************/
function CreateProp(params) {
    const prop = this;

    let propsObj = getVal(params,"propsObj",mainPropsObj);
    let sPropType = getVal(params,"propType","basicProperty");
    let sObjPropName = getVal(params,"objPropName","???");
    let sPropName = getVal(params,"propName",sObjPropName);  // human readable property name
    let sDataType = getVal(params,"dataType","string");
    let nDefaultMaxLength = 50;

    if (sDataType === "number" || sDataType === "int") {
        nDefaultMaxLength = 10;
    } // end if

    let nMaxLength = getVal(params,"maxLength",nDefaultMaxLength);

    let bReadOnly = getVal(params,"readOnly",false);
    let bSticky = getVal(params,"sticky",false);
    let sCategory = getVal(params,"category","misc");
    let optionSet = getVal(params,"optionSet",undefined); // when used, it is array of possible options
    let altGuiDomEl = getVal(params,"altGuiDomEl",undefined);
    let bAutoUpdate = getVal(params,"autoUpdate",false);
    let sDescr = getVal(params,"descr","");
    let nIndexNum = getVal(params,"indexNum",0);
    let vBeginEditValue;
    let vPendingValue;
    let bEditingValue = false;
    let propLevelChangeEventHandlers = [];

    if (typeof optionSet === "undefined" && sDataType==="boolean") {
        optionSet = [];
        optionSet.push({caption:"True",value:true})
        optionSet.push({caption:"False",value:false})
    } // end if

    // **************************************************************************************



    // #property_obj_custom_prop_def

    Object.defineProperties(prop, {
        //
        "objType": {
            "get": function() { 
                return "propPanelProperty";
            } // end of getter code!
        },  // end of "objType" property definition

        "value": {
            "get": function() { 
                return propsObj[sObjPropName];
            }, // end of getter code!

            "set": function(vNewValue) { 
                let sCheckDataType = sDataType;

                if (sCheckDataType === "int") {
                    sCheckDataType = "number"
                } // end if

                if (typeof vNewValue !== sCheckDataType) {
                    return;
                } // end if

                if (vNewValue !== propsObj[sObjPropName]) {
                    propsObj[sObjPropName] = vNewValue;
                } // end if
                
            } // end of setter code!
        }

    }); // end of Object.defineProperties()




/********************************************************************************
 * 
 *   #data_idx
 * 
 *   Build data index string to add to tag in HTML markup
 ********************************************************************************/      
    function dataIdx() {
        const s=[];
        Q = '"'
        s.push(" data-idx=")
        s.push(Q)
        s.push(nIndexNum)
        s.push(Q)
        s.push(" ")
        return s.join("");
    } // end of function dataIdx()



   /********************************************************************************
    * 
    *  #prop_id
    *   
    ********************************************************************************/      
    function propId(sPart) {
        const s=[];
        
        s.push(sContainerId+"_")
        s.push(nIndexNum)
        s.push("_"+sPart)

        return s.join("");
    } // end of function dataIdx()





   /********************************************************************************
    * 
    *  #prop_setup_color_change
    *   
    ********************************************************************************/      
    prop.setupColorChange = function() {
        console.log("prop.setupColorChange() called 🖍")
        
        const orvPropSwatchNd = document.getElementById(propId("orvPropSwatch"));
        orvPropSwatchNd.addEventListener("change", colorChanged);
       // orvPropSwatchNd.addEventListener("click", propsClick);
        

    } // end of prop.setupColorChange() method



   /********************************************************************************
    * 
    *  #color_changed
    * 
    *   called on an input tag type='color' change event
    *   
    ********************************************************************************/     
    function colorChanged(evt) {
        console.log("colorChanged() function called")
        const el = evt.srcElement;

        if (el.value !== propsObj[sObjPropName]) {
            const sOldValue = propsObj[sObjPropName]+"";
            const sNewValue = el.value+"";
            propsObj[sObjPropName] = el.value;
            const orvPropColorCodeNd = document.getElementById(propId("orvPropColorCode"))
            orvPropColorCodeNd.innerText = el.value;

            if (sOldValue !== sNewValue) {
                runChangeEventHandlers(prop, sOldValue, sNewValue);
                runPropLevelChangeEventHandlers(sOldValue, sNewValue)
            } // end if
            
        } // end if

    } // end of function colorChanged()




   /********************************************************************************
    * 
    *   
    *   #prop_add_event_listener_method
    * 
    ********************************************************************************/  
    prop.addEventListener = function(sEvent, functToRun) {
        const eventInfoObj = {};
        eventInfoObj.event = sEvent;
        eventInfoObj.functToRun = functToRun;
 
        // event to fire when property value changes:       
        if (sEvent === "change" && typeof functToRun === "function") {
            propLevelChangeEventHandlers.push(eventInfoObj)
        } // end if
    } // end of prop.addEventListener()



  /********************************************************************************
   * 
   *   #run_prop_level_change_event_handlers
   ********************************************************************************/     
   function runPropLevelChangeEventHandlers(vOldValue,vNewValue) {
       const nMax = propLevelChangeEventHandlers.length;

       for (let n=0; n< nMax; n++) {           
           eventInfoObj = propLevelChangeEventHandlers[n]
           const funcToRun = eventInfoObj.functToRun;
           customEventObj = {};
           customEventObj.level = "property"
           customEventObj.event = "change"
           customEventObj.timestamp = new Date();
           customEventObj.propertyObj = prop;
           customEventObj.oldValue = vOldValue;
           customEventObj.newValue = vNewValue;
           funcToRun(customEventObj);
       } // next n

   } // end of function runPropLevelChangeEventHandlers()    




   /********************************************************************************
    * 
    *   
    *   #prop_sel_prop_method
    * 
    ********************************************************************************/      
    prop.selProp = function() {
        const propNameEl = document.getElementById(propId("orvPropName"));
        propNameEl.className = "orvPropNameSel"

        const orvPropDescPanelTitleNd = document.getElementById("orvPropDescPanelTitle");
        const orvPropDescPanelDetailsNd = document.getElementById("orvPropDescPanelDetails");

        orvPropDescPanelTitleNd.innerHTML = "Selected Property: <i>"+sPropName+"</i>";
        orvPropDescPanelDetailsNd.innerText = sDescr;

        if (Array.isArray(optionSet)) {
            const propNd = document.getElementById(propId("orvProp"));
            const dropdownBtnNd = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            dropdownBtnNd.setAttribute("id", propId("orvPropDropdownBtn"));
            dropdownBtnNd.setAttribute("class", "orvPropDropdownButton");
            dropdownBtnNd.setAttribute("width", "19");
            dropdownBtnNd.setAttribute("height", "19");
            const s=[];
            const Q='"';

            // draw a Down Arrow on the button!
            const sStartPos = "5 8"
            s.push("<path d=")
            s.push(Q)
            s.push("M"+sStartPos+" "); // move upper left corner
            s.push("L11 8 "); // draw line to upper right corner
            s.push("L8 11 "); // draw line to lower middle corner
        //    s.push("L"+sStartPos+" "); // draw line back to original start drawing position
            s.push(Q)
            s.push(" fill='#616161' stroke='#616161' stroke-width='1' stroke-linejoin='miter' ")            
            s.push("/>")

           // alert(s.join(""))
            dropdownBtnNd.innerHTML = s.join("");

            dropdownBtnNd.addEventListener("click", dropdownToggle);

            propNd.appendChild(dropdownBtnNd)
        } // end if

    } // end of prop.selProp() method





   /********************************************************************************
    * 
    *   #prop_de_sel_prop_method
    * 
    *   Deselect the previously selected property.
    ********************************************************************************/    
    prop.deSelProp = function() {
        const propNameEl = document.getElementById(propId("orvPropName"));
        propNameEl.className = "orvPropName"

        if (Array.isArray(optionSet)) {
            let dropdownBtnNd = document.getElementById(propId("orvPropDropdownBtn"));
            
            if (dropdownBtnNd !== null) {
                dropdownBtnNd.removeEventListener("click", dropdownToggle);
                dropdownBtnNd.parentElement.removeChild(dropdownBtnNd);
            } // end if

            let dropdownNd = document.getElementById(propId("orvPropDropdown"));
            if (dropdownNd !== null) {
                dropdownNd.removeEventListener("click", procPropOptionSelected);
                dropdownNd.parentElement.removeChild(dropdownNd);
            } // end if
        } // end if

        prop.commitChanges();
    } // end of prop.deSelProp() method



   /********************************************************************************
    * 
    *   #drop_down_toggle
    * 
    *   Builds / Shows / and Hides dropdown list of possible values for
    *   a property.
    * 
    ********************************************************************************/        
    function dropdownToggle(evt) {
        console.log("dropdownToggle() called")
        const dropdownBtnNd = document.getElementById(propId("orvPropDropdownBtn"));
        let dropdownNd = document.getElementById(propId("orvPropDropdown"));
        const propValueEl = document.getElementById(propId("orvPropValue"));
        const bdy = document.getElementsByTagName("BODY")[0];

        if (dropdownNd === null) {
            dropdownNd = document.createElement("div");
            dropdownNd.id = propId("orvPropDropdown");
            dropdownNd.className = "orvPropDropdownList"
            dropdownNd.style.width = (propValueEl.offsetWidth+3)+"px"
            
            let domRect1 = dropdownBtnNd.getBoundingClientRect();
            let nTop = domRect1.y+18;
            let domRect2 = propValueEl.getBoundingClientRect();
            let nLeft = domRect2.x - 5;

            dropdownNd.style.top = (nTop)+"px";
            dropdownNd.style.left = (nLeft)+"px";

            let nEntries = optionSet.length;
            let nShowEntries = nEntries;

            if (nShowEntries > 6) {
                nShowEntries = 6;
            } // end if

            let nHeight = nShowEntries * 18 ;
            dropdownNd.style.height = (nHeight)+"px";

            const s = [];
            const Q = '"';
            let bItemAlreadySelected = false;

            s.push("<ul class='orvPropsList' ")
            s.push("style=")
            s.push(Q)
            s.push("width:"+(propValueEl.offsetWidth * 2)+"px;")
            s.push(Q)
            s.push(">")

            for (let n=0;n<nEntries;n++) {
                const lstOpt = optionSet[n];
                const sOptionType = getVal(lstOpt,"optionType","option")
                const sCaption = getVal(lstOpt,"caption",lstOpt.value)
                let sLstItmClass = "orvPropDropdownListItm"
                
                if (sOptionType === "heading") {
                    s.push("<li class='orvPropDropdownListHdr' >")
                } else {
                    if (lstOpt.value === propsObj[sObjPropName]) {
                        sLstItmClass = "orvPropDropdownListItmSel"
                        bItemAlreadySelected = true;
                    } // end if
    
                    s.push("<li class='"+sLstItmClass+"' ")

                    s.push(" data-idx="+Q+n+Q)
                    s.push(">")
                } // end if

                if (sDataType === "color" && sOptionType !== "heading") {
                    s.push("<div class='orvColorOptContnr'>")
                    
                    s.push("<div class='orvColorOptSwatch' ")
                    s.push("style="); 
                    s.push(Q); 
                    s.push("background:"+lstOpt.value+";"); 
                    s.push(Q); 
                    s.push(" data-idx="+Q+n+Q)
                    s.push("></div>\n\n"); //orvColorOptSwatch

                    s.push("<div class='orvColorOptCaption' ")
                    s.push(" data-idx="+Q+n+Q)

                    if (typeof sCaption === "string" || typeof sCaption === "number") {
                        s.push(" title="); 
                        s.push(Q); 
                        s.push(sCaption); // needs something to escape out any double quote characters
                        s.push(Q); 
                    } // end if

                    s.push(" >");
                    
                } // end if

                s.push(sCaption)

                if (sDataType === "color" && sOptionType !== "heading") {                    
                    s.push("</div>\n"); // orvColorOptCaption
                    s.push("</div>\n"); // colorOptContnr
                } // end if (sDataType === "color" && sOptionType !== "heading")

                s.push("</li>")

            } // next n

            s.push("</ul>")
            
            dropdownNd.innerHTML = s.join("");

            console.dir(dropdownNd)

            dropdownNd.addEventListener("click", procPropOptionSelected);

            bdy.appendChild(dropdownNd);

            if (bItemAlreadySelected) {
                const orvPropDropdownListItmSelNd = document.getElementsByClassName("orvPropDropdownListItmSel")[0];
                orvPropDropdownListItmSelNd.scrollIntoView({behavior:"smooth",block:"end"});
            } // end if

        } else {
            dropdownNd.removeEventListener("click", procPropOptionSelected);
            dropdownNd.parentElement.removeChild(dropdownNd);
        } // end if/else

    } // end of function dropdownToggle()




    /********************************************************************************
     * 
     *   
     *  #proc_prop_option_selected
     ********************************************************************************/      
    function procPropOptionSelected(evt) {
        console.log("procPropOptionSelected() called")
        const el = evt.srcElement;

        if (el.className !== "orvPropDropdownListItm" && 
            el.className !== "orvPropDropdownListItmSel" &&
            el.className !== "orvColorOptContnr" &&
            el.className !== "orvColorOptSwatch" &&
            el.className !== "orvColorOptCaption") {
            return;
        } // end if

        //
        const idx = el.dataset.idx-0;
        const optionPicked = optionSet[idx];
        const vOldValue = propsObj[sObjPropName];
        const vNewValue = optionPicked.value;

        propsObj[sObjPropName] = optionPicked.value;
        let sCaptionKey = "orvPropValue";

        if (sDataType === "color") {
            sCaptionKey = "orvPropColorCode";            
            const swatch = document.getElementById(propId("orvPropSwatch"));
            swatch.style.backgroundColor = optionPicked.value;
        } // end if
        
        
        const propValEl = document.getElementById(propId(sCaptionKey));
        const sCaption = getVal(optionPicked,"caption", optionPicked.value) ;

        propValEl.innerText = sCaption;

        dropdownToggle(); // should toggle dropdown to Hidden/Removed position

        if (vOldValue !== vNewValue) {
            runChangeEventHandlers(prop, vOldValue, vNewValue);
            runPropLevelChangeEventHandlers(vOldValue, vNewValue)
        } // end if        

    } // end of function procPropOptionSelected()




    /********************************************************************************
     * 
     *   
     *   #prop_commit_changes_method
     * 
     ********************************************************************************/    
    prop.commitChanges = function() {
        console.log("prop.commitChanges() called");
        const propValElInp = document.getElementById(propId("orvPropValueInput"));

        if (propValElInp !== null) {
            propValElInp.removeEventListener("keydown", textBoxHandleKeyup);
            propValElInp.removeEventListener("keyup", textBoxHandleKeyup);
            propValElInp.parentElement.removeChild(propValElInp);
            console.log("child removed")
            const propValEl = document.getElementById(propId("orvPropValue"));
            propValEl.innerText = vPendingValue;

            if (sDataType === "number" || sDataType === "int") {
                if (vPendingValue === "") {
                    vPendingValue = undefined;
                } else {
                    vPendingValue = vPendingValue - 0;
                } // end if/else

            } // end if

            let vOldValue = propsObj[sObjPropName];
            let vNewValue = vPendingValue;

            propsObj[sObjPropName] = vPendingValue;

            if (vOldValue !== vNewValue) {
                runChangeEventHandlers(prop, vOldValue, vNewValue);
                runPropLevelChangeEventHandlers(vOldValue, vNewValue)
            } // end if
            

        } // end if
    } // end of prop.commitChanges() method



    /********************************************************************************
     * 
     *   
     *   #prop_begin_edit_method
     * 
     ********************************************************************************/      
    prop.beginEdit = function() {

        if (Array.isArray(optionSet)) {
            return; // if there is an option set, we will not edit value in a text box!
        } // end if

        bEditingValue = true;
        const s=[];
        const Q = '"';
        const propValEl = document.getElementById(propId("orvPropValue"));

        if (sDataType==="string" || sDataType==="number" || sDataType==="int") {
            s.push("<input class='orvPropValueTextBox' ")
            s.push("id=")
            s.push(Q)
            s.push(propId("orvPropValueInput"))
            s.push(Q)
            s.push(" maxlength='"+nMaxLength+"' ")

            s.push(">")
            propValEl.innerHTML = s.join("");
            const propValElInp = document.getElementById(propId("orvPropValueInput"));
            vBeginEditValue = propsObj[sObjPropName]
            vPendingValue = vBeginEditValue;
            propValElInp.value = vBeginEditValue;
            propValElInp.addEventListener("keydown", textBoxHandleKeydown);
            propValElInp.addEventListener("keyup", textBoxHandleKeyup);
        } // end if
    } // end of prop.beginEdit() method




    function keystrokeIsNonDataValue(nKeyCode) {

        switch(nKeyCode) {
            case ESC_KEY:
            case ENTER_KEY:
            case BACKSPACE_KEY:
            case LEFTARROW_KEY:
            case RIGHTARROW_KEY:
            case HOME_KEY:
            case END_KEY:
            case INSERT_KEY:
            case TAB_KEY:
            case SHIFT_KEY:
            case CTRL_KEY:
            case CMD_KEY:
                return true;
            default:
                return false;
        } // end of switch()

        
    } // end of function keystrokeIsNonDataValue()



   /********************************************************************************
    * 
    *   #text_box_handle_keydown
    * 
    ********************************************************************************/    
   function textBoxHandleKeydown(evt) {
       console.log("textBoxHandleKeydown() called.   keyCode="+evt.keyCode)
       let nKeyCode = evt.keyCode;
       const propValElInp = document.getElementById(propId("orvPropValueInput"));

       if (keystrokeIsNonDataValue(nKeyCode)) {
            return true; // let non-data values through
       } // end if

       if (sDataType==="string") {
           return true; // let whatever keystroke it is through
       } // end if

       if (sDataType==="number" || sDataType==="int") {
           if (nKeyCode > 47 && nKeyCode < 58) {
            return true; // let characters 0-9 through
           } // end if
       } // end if

       if (sDataType==="number" && nKeyCode === 110 && propValElInp.value.indexOf(".") === -1) {
           return true; // let a decimal point through (if none in value yet)
       } // end if

       if ((sDataType==="number" || sDataType==="int") && nKeyCode === 109) {
           return true; // let a minus sign through (gotta handle this better)
       } // end if

       event.preventDefault();

   } // end of function textBoxHandleKeydown()



   /********************************************************************************
    * 
    *   #text_box_handle_keyup
    ********************************************************************************/    
    function textBoxHandleKeyup(evt) {
        let nKeyCode = evt.keyCode;
        const propValElInp = document.getElementById(propId("orvPropValueInput"));

        // reset (back out)
        if (nKeyCode===ESC_KEY) {
            const propValEl = document.getElementById(propId("orvPropValue"));
            vPendingValue = vBeginEditValue;
            propValElInp.removeEventListener("keydown", textBoxHandleKeyup);
            propValElInp.removeEventListener("keyup", textBoxHandleKeyup);
            propValElInp.parentElement.removeChild(propValElInp);
            propValEl.innerText = vPendingValue;

            console.log("child removed")
            if (bAutoUpdate && typeof altGuiDomEl !== "undefined") {
                altGuiDomEl.innerText = vPendingValue;
            } // end if

            return;
        } // end if (nKeyCode===ESC_KEY)


        if (nKeyCode===ENTER_KEY) {
            console.log("Enter key pressed")
            prop.commitChanges();
            return;
        } // end if


        vPendingValue = propValElInp.value;

        if (bAutoUpdate && typeof altGuiDomEl !== "undefined") {
            altGuiDomEl.innerText = vPendingValue;
        } // end if
        
    } // end of function textBoxHandleKeyup()





   /********************************************************************************
    * 
    *   #prop_toggle_prop_value
    ********************************************************************************/    
    prop.togglePropValue = function() {

        if (!Array.isArray(optionSet)) {
            return;
        } // end if

        const vCurrentValue = propsObj[sObjPropName];
        const nMax = optionSet.length;

        if (nMax<2) {
            return; // if this is true, there is no point in going any further!
        } // end if

        let nCurrentIdx = nMax - 1;

        // find out what index the current value is
        for (let n=0;n<nMax;n++) {
            const optionSetOption = optionSet[n];
            if (optionSetOption.value ===vCurrentValue) {
                nCurrentIdx = n;
                console.log("found current value in option set. index="+nCurrentIdx)
                break; // break out of for loop
            } // end if
        } // next n


        let optionSetOption;
        do {
            nCurrentIdx = nCurrentIdx + 1;

            if (nCurrentIdx>nMax-1) {
                nCurrentIdx = 0;
            } // end if

            optionSetOption = optionSet[nCurrentIdx];
        } while (optionSetOption.optionType === "heading")        
        
        propsObj[sObjPropName] = optionSetOption.value;

        if (sDataType !== "color") {            
            const propValEl = document.getElementById(propId("orvPropValue"));
            propValEl.innerText = optionSetOption.caption;
        } else {
            const swatch = document.getElementById(propId("orvPropSwatch"));
            swatch.style.backgroundColor = optionSetOption.value;

            const propValEl = document.getElementById(propId("orvPropColorCode"));
            const sCaption = getVal(optionSetOption,"caption", optionSetOption.value) ;
            propValEl.innerText = sCaption;
        } // end if/else
        

        

    } // end of prop.togglePropValue() method






   /********************************************************************************
    * 
    *   
    *    #get_option_set_caption
    * 
    ********************************************************************************/    
    function getOptionSetCaption(vValue) {
        const nMax = optionSet.length;

        for (let n=0;n<nMax;n++) {
            const optionSetItm = optionSet[n];
            if (optionSetItm.value === vValue) {
                return optionSetItm.caption;
            }
        } // next n
        return "???"
    } // end of function getCurrentOptionSetCaption() 




   /********************************************************************************
    * 
    *   
    *   #prop_markup_method
    * 
    ********************************************************************************/
    prop.markup = function() {
        const s=[];
        const Q = '"';

        s.push("<li class='orvPropLi'  ")
        s.push("id="+Q+propId("li")+Q+" ")
        s.push(dataIdx())
        s.push(">")

        s.push("<div class='orvProp' ")
        s.push("id="+Q+propId("orvProp")+Q+" ")
        s.push(dataIdx())
        s.push(">")

        s.push("<div class='orvPropName' ")
        s.push("id="+Q+propId("orvPropName")+Q+" ")
        s.push(dataIdx())
        s.push(">")

        s.push(sPropName)

        s.push("</div>"); // orvPropName

        s.push("<div class='orvPropValue' ")
        s.push("id="+Q+propId("orvPropValue")+Q+" ")
        s.push(dataIdx())
        s.push(">")

        if (sDataType==="string" || sDataType==="int" || sDataType==="number") {
            if (!Array.isArray(optionSet)) {
                s.push(propsObj[sObjPropName])
            } else {
                s.push(getOptionSetCaption(propsObj[sObjPropName]))
            } // if/else

        } // end if

        if (sDataType==="boolean") {
            const bVal = propsObj[sObjPropName];

            if (bVal) {
                s.push("True")
            } else {
                s.push("False")
            } // end if/else

        } // end if

        if (sDataType==="color") {            
            s.push(getColorValueMarkup())
            
        } // end if

        s.push("</div>"); // orvPropValue

        s.push("</div>"); // orvProp

        s.push("</li>")
        return s.join("");
    } // end of prop.markup() method

    


   /********************************************************************************
    * 
    *   
    *   #get_color_value_markup
    * 
    ********************************************************************************/    
    function getColorValueMarkup() {
        const s=[];

        const sColor = propsObj[sObjPropName];

        const bHasOptionSet = Array.isArray(optionSet);

        if (bHasOptionSet) {
            s.push("<div class='orvPropSwatch' ")
        } else {
            s.push("<input class='orvPropInpSwatch' type='color' ")
            s.push("value='"+sColor+"' ")
            swatchIdListByIndex.push(prop)
        } // end if/else
        
        s.push("id="+Q+propId("orvPropSwatch")+Q+" ")
        s.push(dataIdx())

        if (bHasOptionSet) {
            s.push("style='background:"+sColor+";'")
        } // end if

        s.push(dataIdx())

        s.push(">")

        if (bHasOptionSet) {
            s.push("</div>"); // orvPropSwatch
        } // end if

        if (bHasOptionSet) {
            s.push("<div class='orvPropColorCode' ")
        } else {
            s.push("<div class='orvPropColorCode2' ")
        } // end if

        s.push(dataIdx())

        s.push("id="+Q+propId("orvPropColorCode")+Q+" ")
        s.push(">");
        s.push(sColor);
        s.push("</div>"); // orvPropColorCode

        return s.join("");
    } // end of function getColorValueMarkup()




} // end of CreateProp() constructor



// #prop_container_event_listeners
containerNd.addEventListener("click", propsClick);
containerNd.addEventListener("dblclick", propsDblClick);






/********************************************************************************
 * 
 *   
 *   #props_click
 * 
 ********************************************************************************/
function propsClick(evt) {
    console.log("propsClick() called")
    const el = evt.srcElement;

    console.log("###### "+el.className)

    if (el.className !== "orvPropName" && el.className !== "orvPropValue"  && el.className !== "orvPropInpSwatch" 
        && el.className !== "orvPropSwatch" && el.className !== "orvProp" 
        && el.className !== "orvPropColorCode"&& el.className !== "orvPropColorCode2") {
        return;
    } // end if

    console.log(el.className)

    const idx = el.dataset.idx - 0;

    const prop = propsByIndex[idx];

    if (nLastSelectedPropIndex > -1) {
        const lastProp = propsByIndex[nLastSelectedPropIndex];
        lastProp.deSelProp();
    } // end if

    prop.selProp();

    if (el.className === "orvPropValue") {
        prop.beginEdit();
    } // end if

    nLastSelectedPropIndex = idx;

    
} // end of function propsClick()




/********************************************************************************
 * 
 *   
 *   #props_dbl_click
 * 
 ********************************************************************************/
function propsDblClick(evt) {
    const el = evt.srcElement;

    if (nLastSelectedPropIndex > -1) {
        const prop = propsByIndex[nLastSelectedPropIndex];
        prop.togglePropValue()
    } // end if
} // end of function propsClick()






/********************************************************************************
 * 
 *   #get_val
 ********************************************************************************/
function getVal(params,sParam,defVal) {
    if (!params) {
        params = {};
    } // end if

    if (typeof params[sParam] !== "undefined") {
        return params[sParam];
    } else {
        return defVal;
    } // if / else

} // end of function getVal()


} // end of OrvProps constructor
