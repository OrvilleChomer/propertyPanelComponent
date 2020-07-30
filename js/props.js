/**********************************************************************************
    props.js
    

    Key Code Reference Tags:
         -  #library_constructor                 LIBRARY CONSTRUCTOR
         -  #props_add_prop_method
         -  #props_display_panel_method
         -  #set_main_props_method
         -  #props_clean_up
         -  #props_add_prop_method               📌ADD PROPERTY METHOD!

         -  #props_display_panel_method          Build Markup and display panel in 
                                                 Browser.
        
         -  #private_functions
         -  #build_prop_style_block              🖼🖼 CSS Styles 🖼🖼



 
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

    const ESC_KEY = 27;
    const ENTER_KEY = 13;
    


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
  *   #props_clean_up
  * 
  *   Call this Before removing a property panel from the page...
  *   (If you are not just leaving the page)
  * 
  *   This includes removing any event listeners that need removing.
  ********************************************************************************/ 
  props.cleanUp = function() {
    
  } // end of props.cleanUp() method




   /********************************************************************************
    * 
    *   #props_add_prop_method
    ********************************************************************************/ 
    props.addProp = function(params) {
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

        containerNd.innerHTML = s.join("");

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

        s.push(".orvPropDropdownListItmSel {");
        s.push("  font-family: tahoma;");
        s.push("  font-size: 13px;");
        s.push("  text-height: 18px;");
        s.push("  background:#E4E6F1;");
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
    let sObjPropName = getVal(params,"objPropName","???");
    let sPropName = getVal(params,"propName",sObjPropName);  // human readable property name
    let sDataType = getVal(params,"dataType","string");
    let bReadOnly = getVal(params,"readOnly",false);
    let bSticky = getVal(params,"sticky",false);
    let sCategory = getVal(params,"category","misc");
    let optionSet = getVal(params,"optionSet",undefined); // when used, it is array of possible options
    let altGuiDomEl = getVal(params,"altGuiDomEl",undefined);
    let bAutoUpdate = getVal(params,"autoUpdate",false);
    let nIndexNum = getVal(params,"indexNum",0);
    let vBeginEditValue;
    let vPendingValue;
    let bEditingValue = false;

    if (typeof optionSet === "undefined" && sDataType==="boolean") {
        optionSet = [];
        optionSet.push({caption:"True",value:true})
        optionSet.push({caption:"False",value:false})
    } // end if

    Object.defineProperties(prop, {
        //
        "objType": {
            "get": function() { 
                return "propPanelProperty";
            } // end of getter code!
        }  // end of "objType" property definition

    }); // end of Object.defineProperties()




/********************************************************************************
 * 
 *   
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
 *   
 ********************************************************************************/      
    prop.selProp = function() {
        const propNameEl = document.getElementById(propId("orvPropName"));
        propNameEl.className = "orvPropNameSel"

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
    *   
    ********************************************************************************/    
    prop.deSelProp = function() {
        const propNameEl = document.getElementById(propId("orvPropName"));
        propNameEl.className = "orvPropName"

        if (Array.isArray(optionSet)) {
            let dropdownBtnNd = document.getElementById(propId("orvPropDropdownBtn"));
            
            if (dropdownBtnNd !== null) {
                dropdownBtnNd.parentElement.removeChild(dropdownBtnNd);
            } // end if

            let dropdownNd = document.getElementById(propId("orvPropDropdown"));
            if (dropdownNd !== null) {
                dropdownNd.parentElement.removeChild(dropdownNd);
            } // end if
        } // end if

        prop.commitChanges();
    } // end of prop.deSelProp() method



   /********************************************************************************
    * 
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

            s.push("<ul class='orvPropsList' ")
            s.push("style=")
            s.push(Q)
            s.push("width:"+(propValueEl.offsetWidth * 2)+"px;")
            s.push(Q)
            s.push(">")

            for (let n=0;n<nEntries;n++) {
                const lstOpt = optionSet[n];
                let sLstItmClass = "orvPropDropdownListItm"

                if (lstOpt.value === propsObj[sObjPropName]) {
                    sLstItmClass = "orvPropDropdownListItmSel"
                } // end if

                s.push("<li class='"+sLstItmClass+"' ")
                s.push(" data-idx="+Q+n+Q)
                s.push(">")

                s.push(lstOpt.caption)
                s.push("</li>")
            } // next n

            s.push("</ul>")

            dropdownNd.innerHTML = s.join("");
            dropdownNd.addEventListener("click", procPropOtionSelected);

            //orvPropsListCntrNd.appendChild(dropdownNd)
            bdy.appendChild(dropdownNd);
        } else {
            dropdownNd.parentElement.removeChild(dropdownNd);
        } // end if/else

    } // end of function dropdownToggle()




    /********************************************************************************
     * 
     *   
     ********************************************************************************/      
    function procPropOtionSelected(evt) {
        console.log("procPropOtionSelected() called")
        const el = evt.srcElement;

        if (el.className !== "orvPropDropdownListItm" && el.className !== "orvPropDropdownListItmSel") {
            return;
        } // end if

        const idx = el.dataset.idx-0;
        const optionPicked = optionSet[idx];
        propsObj[sObjPropName] = optionPicked.value;
        const propValEl = document.getElementById(propId("orvPropValue"));
        propValEl.innerText = optionPicked.caption;

        dropdownToggle(); // should toggle dropdown to Hidden/Removed position
    } // end of function procPropOtionSelected()




    /********************************************************************************
     * 
     *   
     ********************************************************************************/    
    prop.commitChanges = function() {
        console.log("prop.commitChanges() called");
        const propValElInp = document.getElementById(propId("orvPropValueInput"));

        if (propValElInp !== null) {
            propValElInp.parentElement.removeChild(propValElInp);
            console.log("child removed")
            const propValEl = document.getElementById(propId("orvPropValue"));
            propValEl.innerText = vPendingValue;
            propsObj[sObjPropName] = vPendingValue;
        } // end if
    } // end of prop.commitChanges() method



    prop.beginEdit = function() {
        bEditingValue = true;
        const s=[];
        const Q = '"';
        const propValEl = document.getElementById(propId("orvPropValue"));

        if (sDataType==="string") {
            s.push("<input class='orvPropValueTextBox' ")
            s.push("id=")
            s.push(Q)
            s.push(propId("orvPropValueInput"))
            s.push(Q)
            s.push(">")
            propValEl.innerHTML = s.join("");
            const propValElInp = document.getElementById(propId("orvPropValueInput"));
            vBeginEditValue = propsObj[sObjPropName]
            vPendingValue = vBeginEditValue;
            propValElInp.value = vBeginEditValue;
            propValElInp.addEventListener("keyup", textBoxHandleKeyup);
        } // end if
    } // end of prop.beginEdit() method



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
    *   
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

        nCurrentIdx = nCurrentIdx + 1;

        if (nCurrentIdx>nMax-1) {
            nCurrentIdx = 0;
        } // end if

        const optionSetOption = optionSet[nCurrentIdx];
        propsObj[sObjPropName] = optionSetOption.value;

        const propValEl = document.getElementById(propId("orvPropValue"));
        propValEl.innerText = optionSetOption.caption;

    } // end of prop.togglePropValue() method






   /********************************************************************************
    * 
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

        if (sDataType==="string" || sDataType==="int") {
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
            const sColor = propsObj[sObjPropName];
            s.push("<div class='orvPropSwatch' ")
            s.push("id="+Q+propId("orvPropSwatch")+Q+" ")
            s.push(dataIdx())
            s.push("style='background:"+sColor+";'")
            s.push(">")

            s.push("</div>"); // orvPropSwatch
        } // end if

        s.push("</div>"); // orvPropValue

        s.push("</div>"); // orvProp

        s.push("</li>")
        return s.join("");
    } // end of prop.markup() method


    containerNd.addEventListener("click", propsClick);
    containerNd.addEventListener("dblclick", propsDblClick);
    
} // end of CreateProp() constructor




/********************************************************************************
 * 
 *   
 ********************************************************************************/
function propsClick(evt) {
    const el = evt.srcElement;


    if (el.className !== "orvPropName" && el.className !== "orvPropValue" 
        && el.className !== "orvPropSwatch" && el.className !== "orvProp") {
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
