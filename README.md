# Property Panel Component
Allow devs to easily add a Microsoft IDE-esk property panel to their web page using this JavaScript library.

It could have more features, but I specifically designed it for a project I'm working on. And it
is most important (of course) that it work for that!

Other features will be put in when I get to it. 😛

Adding component library to page:
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
    sampleContactObj.favoriteColor = "blue";
    sampleContactObj.favoriteDessert = "Cherry Pie";
    sampleContactObj.baseSalary = 50000;
    
    propPanel = new OrvProps('prop_panel');
 } // end of pageSetup() function
