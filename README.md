# Property Panel Component
Allow devs to easily add a Microsoft IDE-esk property panel to their web page using this JavaScript library.

It could have more features, but I specifically designed it for a project I'm working on. And it
is most important (of course) that it work for that!

Other features will be put in when I get to it. 😛

Adding component library to page (using my Github 'CDN'):
```
<script src=""></script>
```

You need a DIV to place your property panel in:
```
<div id="prop_panel"></div>
```

Let's add some basic styling to it...
```
<style>
   #prop_panel {
      border:solid black .5px;
      width:600px;
      height:900px;
   }
</style>
```
Let's make our property panel! We will do this with some JavaScript in our page's code...

```
let propPanel;

/*
   pageSetup() would be set to run on the page's load event!
 */
 function pageSetup() {
    const sampleContactObj = {};
 
    // the object that our property panel will be displaying and editing property values from...
    sampleContactObj.firstName = "George";
    sampleContactObj.lastName = "Washington";
    sampleContactObj.firstPresident = true;
    sampleContactObj.phoneNumber = "708-555-1234";
    sampleContactObj.faxNumber = "708-555-9876";
    sampleContactObj.address = "Mt. Vernon";
    sampleContactObj.state = "Virgina";
    sampleContactObj.favoriteColor = "#0000ff";
    sampleContactObj.favoriteDessert = "Cherry Pie";
    sampleContactObj.baseSalary = 50000;
    
    propPanel = new OrvProps('prop_panel');
    propPanel.setMainPropsObj(sampleContactObj);
    
    // lets add some of these properties to our panel...
    propPanel.addProp({objPropName:"firstName",propName:"First Name",
                      descr:"The contact's first name"});
                                            
    propPanel.addProp({objPropName:"lastName",propName:"Last Name",
                      descr:"The contact's last name"});
                      
    propPanel.addProp({objPropName:"baseSalary",propName:"Base Salary",dataType:"number",descr:"How much dough did our contact make?"})
    propPanel.addProp({objPropName:"firstPresident",propName:"First President?",dataType:"boolean",descr:"Were they the first president?"})
    
    let colorSet = [];
    colorSet.push({value:"#ff0000"});  // Red
    colorSet.push({value:"#008000"});  // Green
    colorSet.push({value:"#0000ff"});  // Blue
    colorSet.push({value:"#ffff00"});  // Yellow
    
    orvProps.addProp({objPropName:"favoriteColor",propName:"Favorite Color",optionSet:colorSet,
                      dataType:"color",descr:"Contact's favorite color."})
                      
    
    orvProps.displayPanel();  // this will fill the 'prop_panel' div with a rendered, functional property panel!
 } // end of pageSetup() function 
```

Note: The properties will appear in the panel in the order that they were added.
