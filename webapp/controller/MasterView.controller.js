sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
    "sap/ui/model/Sorter"
], (Controller,JSONModel,Filter,FilterOperator,Sorter) => {
    "use strict";

    return Controller.extend("app.splitapp.controller.MasterView", {
        onInit() {
                //   var oModel=new JSONModel();
                //   oModel.loadData("/model/mockData/toolsData.json")
                //   sap.ui.getCore().setModel(oModel,"toolModel");
        },
        onDetailView:function(){
            //get the router object
            let oRouter=this.getOwnerComponent().getRouter()
            //use the navigation method
            oRouter.navTo("RouteDetail")
        },
        onSort: function() {
            if(!this.bDescending){
                this.bDescending=false;
            }
            var bDescending= false;
            var oSorter=new sap.ui.model.Sorter("toolsName",bDescending);
            var oList=this.getView().byId("idListCtrl");
            var oBinding=oList.getBinding("items");
            oBinding.sort(oSorter);
            this.bDescending= !this.bDescending;
        },
        onSearch:function(oEvent){
            var searchString=oEvent.getParameter("query")|| oEvent.getParameter("newValue");
            var oName=new Filter("toolsName",FilterOperator.Contains,searchString );
            var oAvail=new Filter("availability",FilterOperator.Contains,searchString);
            var aFilter=[oName,oAvail];
            var mainFilter=new Filter({
                filters:aFilter,
                and:false
            });
            var oList=this.getView().byId("idListCtrl");
            var oBiniding=oList.getBinding("items");
            oBiniding.filter(mainFilter);
        },
        
         onItemSelect: function(oEvent){
                  var oList=oEvent.getParameter("listItem")
                  let sPath=oList.getBindingContextPath();
                  let aItems=sPath.split("/");
                  let id=aItems[aItems.length-1];

                //get the router object
                let oRouter=this.getOwnerComponent().getRouter()
                //use the navigation method
                 oRouter.navTo("RouteDetail",
                                         { index:id
                              })


        //  	//when i click it should navigate to the next page
        //  	var oList=oEvent.getParameter("listItem");
         	
        //  // secondly get the ninding context path	
         	
        //  	var sPath=oList.getBindingContextPath();
        //  	var completePath="toolModel>" +sPath;
        //  	console.log(completePath);
         	
        //  //	this.onDetailView();
         
        //  //......get the object of the detail view from the parent View
        //  var oApp=this.getView().getParent();
        //  var oDetail=oApp.getAggregation("pages")[1];
         
        //  //bind the path
        //  oDetail.bindElement(completePath);
		//           	 this.onDetailView();

        }
    });
});