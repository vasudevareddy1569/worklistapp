sap.ui.define([
    "./BaseController",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/Fragment",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], (BaseController,JSONModel,Fragment,Filter,FilterOperator) => {
    "use strict";

    return BaseController.extend("app.splitapp.controller.DetailView", {
         onInit() {

            let oRouter=this.getOwnerComponent().getRouter();
            oRouter.attachRoutePatternMatched(this.onRoutePatternMatched,this)

                //   var oModel=new JSONModel();
                //   oModel.loadData("/model/mockData/toolsData.json")
                //   this.getView().setModel(oModel,"toolModel");
         },

onRoutePatternMatched:function(oEvent){
// console.log(oEvent)
let index=oEvent.getParameter("arguments").index
let sPath="toolModel>/toolsListSet/"+index
let oView=this.getView()
oView.bindElement(sPath)
},
onListView() {
     //get the router object
     let oRouter=this.getOwnerComponent().getRouter()
     //use the navigation method
     oRouter.navTo("RouteMasterView")
},
//.....code for table  

// let oModel=this.getModel("toolModel")
                                                     
// let searchString=oModel.getProperty("/toolsListSet/"+index+"/toolsName")
// let filterName=new sap.ui.model.Filter("toolsName",
//                                   sap.ui.model.FilterOperator.EQ,
//                                   searchString
//                                       )
// //  let aFilter=[filterName]
// let oTable=this.getView().byId("idMTable")
// let bindingInfo=oTable.getBinding("items")
// bindingInfo.filter([filterName]);

// },

onConfirmSupp:function(oEvent){
    let oSeletedItems=oEvent.getParameter("selectedItem")
    let sValue=oSeletedItems.getProperty("info")
    let oInput=sap.ui.getCore().byId(this.inputField)
        oInput.setValue(sValue)
    // confirm the choice
    // we need the value that selected
    // we need to place it exactly at the same input field where the value was selected
    // you are setting the value on that input field
  },
     
  onF4Help: function (oEvent) {
    // let myInputField where the popup actually popped up

    this.inputField = oEvent.getSource().getId();
    let oModel = this.getView().getModel("toolModel")
    let aData = oModel.getProperty("/supplierSet/")
    let deepcopy = JSON.parse(JSON.stringify(aData))
    let oModelFrag = new JSONModel({newSupp:deepcopy})

    if (!this.oDialog) {
      this.oDialog = Fragment.load({
        fragmentName: "app.splitapp.fragments.popUp",
        controller: this
      }).then((dialog) => {
        this.oDialog = dialog;
        this.getView().addDependent(this.oDialog);
        this.getView().setModel(oModelFrag,"FragModel")
        this.oDialog.open();
      })
    } else {
      this.oDialog.open();
    }
  },
  onFilter: function () {
    let aFilter = []
    let sName = this.getView().byId("idInputSupp").getValue()
    let sCity = this.getView().byId("idInputCity").getValue()
    if (sName) {
      let filterName = new Filter("supplierName", FilterOperator.Contains, sName)
      aFilter.push(filterName)
    }
    if (sCity) {
      let filterName = new Filter("location", FilterOperator.Contains, sCity)
      aFilter.push(filterName)
    }
    let oTable = this.getView().byId("idMtable")
    let binding = oTable.getBinding("items");
    binding.filter(aFilter);

  }






    });
});