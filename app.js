const LSCtrl =(function(){



return {

  addItemsInLs:function(item){
  let items;
  if(localStorage.getItem("items") === null){
    items = [];

    items.push(item);

    localStorage.setItem("items", JSON.stringify(items));

  }else{
  items = JSON.parse(localStorage.getItem("items"));

   items.push(item);

   localStorage.setItem("items", JSON.stringify(items));
  }

},

getDataInLS: function(){
 let items;
if(localStorage.getItem("items") === null){
  items = [];

}else{
  items = JSON.parse(localStorage.getItem("items"));
}

return items;
},

updateInTheLS: function(updateItem){
  let items = JSON.parse(localStorage.getItem("items"));

  items.forEach(function(item,index){
      if(item.id === updateItem.id){
        items.splice(index,1,updatedItem);
      }

  })

  localStorage.setItem("items",JSON.stringify(items));

},

deleteInTheLS: function(id){
  let items = JSON.parse(localStorage.getItem("items"));

  items.forEach(function(item,index){
      if(item.id === id){
        items.splice(index,1);
      }

  })

  localStorage.setItem("items",JSON.stringify(items));

},

clearAllInLS: function(){
  localStorage.removeItem("items");
}



}


})();



const itemCtrl = (function(){
  //the constructor
 const items = function(id,name,calories){
  this.id = id;
  this.name = name;
  this.calories = calories;
  // this.date = date;
 }

//  const dateItem = {
   
//      year: new Date().getUTCFullYear(),
//      month: new Date().getUTCMonth() + 1 ,
//      date: new Date().getUTCDate()
     
  
//  }

 //the data structure
const data = {
  items : LSCtrl.getDataInLS(),
  totalCalories: 0,
  currentItem: null
}

//public
return{
  populateData: function(){
     return data.items;
  },
  addItemsInItemCtrl: function(name,calories){
    let ID, date
    if(data.items.length > 0){
       ID = data.items[data.items.length - 1].id + 1
    }else{
      ID = 0
    }
 
    calories= parseInt(calories)

    
 
    const newItem = new items(ID,name,calories)
 
    data.items.push(newItem);
 
    return newItem
   },
   updateListInTheCtrl: function(name, calories){
       calories = parseInt(calories);
        let found = null;
       data.items.forEach(function(item){
        if(item.id === data.currentItem.id){
              item.name = name;
              item.calories = calories;
              
              found = item
            }

       })
       return found

       
       
   },
   deleteInTheCtrl:function(current){
        
        data.items.forEach(function(item,index){
              if(item.id === current.id){
              data.items.splice(index,1);
              
              }
        
        })

        return data.items

        // const ids = data.items.map(function(item){
        //   return item.id;
        // });
  
        // // Get index
        // const index = ids.indexOf(current);
  
        // // Remove item
        // data.items.splice(index, 1);
   },
   getEditListItem:function(curitem){
      let found = null;
      data.items.forEach(item => {
        item.calories = parseInt(item.calories);
        if(curitem === item.id){
          found = item;
          data.currentItem = found;
        }
      })
      
      return data.currentItem
   
  },
   getTotalCalories: function(){
    let total = 0;
    data.items.forEach(item => {
      
      total += item.calories;
     
    })
    data.totalCalories = total

    return data.totalCalories;
   },
   clearAllInCtrl: function(){
     data.items = [];
    //  data.totalCalories = 0;
    //  data.currentItem = null;
   },

   logData: function(){
    return data;
  }


}





})();








//UI Controller
const uiCtrl = (function(){

const  DOMselectors = {
clearall : ".title__button",
meal : "#meal",
calories : "#calories",
add : "#button--add",
update : "#button--update",
delete : "#button--delete",
back : "#button--back",
totalCalories : ".TCal",
Ul : ".list__items",
UList : ".list__items li",
date : ".date",
sectionUl : ".list"
}



return{
  showItemInTheUi:function(items){
    let html = "";

    items.forEach(item => {
      html += `<li class="list__items--content" id="list-${item.id}">
      <div class="flex-i">
        <p class="content">${item.name}: <span class="CA">${item.calories}</span> <span class="CL">calories</span></p>
      </div>
      <a href="#"><ion-icon name="pencil-outline" class="edit" id="pencil"></ion-icon></a>
         
    </li>`
    });

    document.querySelector(DOMselectors.Ul).innerHTML = html;

  },
  getInput: function(){
    return{
      name: document.querySelector(DOMselectors.meal).value,
      calories: document.querySelector(DOMselectors.calories).value
    }
  },
  clearInputState:function(){
    document.querySelector(DOMselectors.meal).value = "";
    document.querySelector(DOMselectors.calories).value = "";
  },
  showEditStateInput:function(cur){
    document.querySelector(DOMselectors.meal).value = `${cur.name}`;
    document.querySelector(DOMselectors.calories).value = `${cur.calories}`;
  },
  showUpdate:function(cur){
      let ul = document.querySelectorAll(DOMselectors.UList);

      ul = Array.from(ul);
      
      ul.forEach(function(list){
      const itemID = list.getAttribute("id");
            
      if(itemID === `list-${cur.id}`){
       document.querySelector(`#${itemID}`).innerHTML = `<div class="flex-i">
       <p class="content">${cur.name}: <span class="CA">${cur.calories}</span> <span class="CL">calories</span></p>
     </div>
     <a href="#"><ion-icon name="pencil-outline" class="edit" id="pencil"></ion-icon></a>`
      }
      })


  },
  addItemsInUI: function(item){
    document.querySelector(DOMselectors.Ul).style.display = "block";
    document.querySelector(DOMselectors.sectionUl).style.display = "block"
   const li = document.createElement("li");

   li.className = "list__items--content";

   li.id = `list-${item.id}`;

   li.innerHTML = `<div class="flex-i">
  <p class="content">${item.name}: <span class="CA">${item.calories}</span> <span class="CL">calories</span></p>
 </div>
 <a href="#"><ion-icon name="pencil-outline" class="edit" id="pencil"></ion-icon></a>`;

   document.querySelector(DOMselectors.Ul).insertAdjacentElement("beforeend", li)

  },
  deleteInTheUi:function(id){
    const item = document.querySelector(`#list-${id}`);

    item.remove();
  },
  showCalories: function(calories){
  document.querySelector(DOMselectors.totalCalories).textContent = calories
  },
  removeFromTheUi: function(){
    let ul = document.querySelectorAll(DOMselectors.UList);

    ul = Array.from(ul);
    
    ul.forEach(function(list){
   
      list.remove();
    
    })
  
  },

  showAllbuttonExceptAddButton: function(){
    document.querySelector(DOMselectors.add).style.display = "none";
    document.querySelector(DOMselectors.update).style.display = "inline";
    document.querySelector(DOMselectors.back).style.display = "inline";
    document.querySelector(DOMselectors.delete).style.display = "inline";

  },
  showAddButtonExceptAllbutton: function(){
    document.querySelector(DOMselectors.add).style.display = "inline";
    document.querySelector(DOMselectors.update).style.display = "none";
    document.querySelector(DOMselectors.back).style.display = "none";
    document.querySelector(DOMselectors.delete).style.display = "none";

  },
  

  hideList: function(){
    document.querySelector(DOMselectors.Ul).style.display = "none";
    document.querySelector(DOMselectors.sectionUl).style.display = "none"
  },

  UIselectors: function(){
    return DOMselectors;
  }
  
}

})();













//APP CONTROLLER
const app = (function(uiCtrl,itemCtrl,LSCtrl){

  const loadEventListener = function(){
    const Selectors = uiCtrl.UIselectors(); 
    
    document.querySelector(Selectors.add).addEventListener('click', addListItems);
    document.querySelector(Selectors.Ul).addEventListener('click', showEditState);
    document.querySelector(Selectors.update).addEventListener('click', updateListItems);
    document.querySelector(Selectors.delete).addEventListener('click', deleteListItems);
    document.querySelector(Selectors.back).addEventListener('click', backListItems);
    document.querySelector(Selectors.clearall).addEventListener('click', clearListItems);




  }

  const addListItems = function(e){
   
      const input = uiCtrl.getInput();
      if(input.name !== "" && input.calories !== "" && input.calories > 0){
        const newItem = itemCtrl.addItemsInItemCtrl(input.name,input.calories);

        uiCtrl.addItemsInUI(newItem)

  
        const totalCalories= itemCtrl.getTotalCalories();

        uiCtrl.showCalories(totalCalories);

        LSCtrl.addItemsInLs(newItem)
        
        
        uiCtrl.clearInputState();

     
    
      }
      
    e.preventDefault();
  }
  

const showEditState = function(e){
 if(e.target.classList.contains("edit")){
  
  const listid = e.target.parentNode.parentNode.id;
  console.log(listid)
  const listArr = listid.split("-");

  const editListItem = parseInt(listArr[1]);

  const cur = itemCtrl.getEditListItem(editListItem);

  uiCtrl.showEditStateInput(cur);

  uiCtrl.showAllbuttonExceptAddButton();

 }


    e.preventDefault();
      }


const updateListItems = function(e){
  const input = uiCtrl.getInput();

  const current= itemCtrl.updateListInTheCtrl(input.name,input.calories);

  uiCtrl.showUpdate(current);

  

  const totalCalories= itemCtrl.getTotalCalories();

  uiCtrl.showCalories(totalCalories);
   
  LSCtrl.updateInTheLS(current);
  
  uiCtrl.clearInputState();

  uiCtrl.showAddButtonExceptAllbutton();

  

e.preventDefault();
  }

const deleteListItems = function(e){
  
  const listItems = itemCtrl.getEditListItem();
    
  itemCtrl.deleteInTheCtrl(listItems)

  uiCtrl.deleteInTheUi(listItems.id)

  
  
  const totalCalories= itemCtrl.getTotalCalories();

    uiCtrl.showCalories(totalCalories);

    LSCtrl.deleteInTheLS(listItems.id)
    
    uiCtrl.clearInputState()
   
    uiCtrl.showAddButtonExceptAllbutton();

    


  e.preventDefault();
  }

  const backListItems = function(e){
    
    const totalCalories= itemCtrl.getTotalCalories();

    uiCtrl.showCalories(totalCalories);

    uiCtrl.clearInputState()
   
    uiCtrl.showAddButtonExceptAllbutton();


    e.preventDefault();
  }

  const clearListItems = function(e){
    
    itemCtrl.clearAllInCtrl();

    
    uiCtrl.removeFromTheUi()

    
    
    const totalCalories= itemCtrl.getTotalCalories();

    uiCtrl.showCalories(totalCalories);

    LSCtrl.clearAllInLS()

    uiCtrl.clearInputState()
   
    
    uiCtrl.showAddButtonExceptAllbutton();

    
    uiCtrl.hideList()

    
    

  e.preventDefault();
  }


return{
  init: function(){

    uiCtrl.showAddButtonExceptAllbutton();
    
    const totalCalories= itemCtrl.getTotalCalories();

    uiCtrl.showCalories(totalCalories);
   
    
//data coming from the data structure
    const dataItem = itemCtrl.populateData();
//Anything with .length is 1 based but index is zero based
if(dataItem.length < 1){
     uiCtrl.hideList()
}else{
// show the data in the UI
     uiCtrl.showItemInTheUi(dataItem);
}

    //load all event listener
    loadEventListener();
  }
}



})(uiCtrl,itemCtrl,LSCtrl);

app.init();