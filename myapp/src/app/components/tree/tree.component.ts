import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EntityService } from '../../services/entity.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css'],
    standalone: true, 
    imports: [CommonModule, FormsModule]
  
})
export class TreeComponent implements OnInit  {
         
  @Input() ulClass="tree";
  @Input() ulParent="100";
  @Input() tree:any={};
  @Input() catalogName:string="";
  @Input() entityName:string="";
  @Input() parentName:string="";
  @Input() nodeName:string="";
  @Input() childsName:string="";

  @Output()
  setBranch = new EventEmitter<any>();         

  path=[1,0,1];
  node:any;
  copia:any;
  copiaRef:any;
  element:any="";
  opcion:any;
  status:string="Consulta...";

  constructor(public router:Router, 
              public route:ActivatedRoute,
              public entityService:EntityService
  ) {}

  ngOnInit(): void {
    this.entityName=this.entityName || this.route.snapshot.url[0].path;
    this.catalogName=this.catalogName || this.route.snapshot.url[1].path;
    this.nodeName=this.nodeName || this.route.snapshot.data['nodeName'];
    this.parentName=this.parentName || this.route.snapshot.data['parentName'] || this.nodeName;
    this.childsName=this.childsName || this.route.snapshot.data['childsName'];
    if (this.ulClass=="tree") {
      console.log("Start Tree:", this.entityName, " Catalog:", this.catalogName)
      if (this.catalogName!="tree") {
        this.readCatalog(this.catalogName,this.nodeName)
      }     
      this.readTree(this.entityName)
      // for dev and noDB this.copia=this.tree=this.node=this.empresa
    }  
  }

  add() {
    this.node[this.childsName].splice(this.node.i+1,0,this.newChild(""));
  }

  addChild() {
    this.node[this.childsName][this.node.i][this.childsName].splice(0,0,this.newChild(""));
  }

  newChild(name:string) {
    return {[this.nodeName]:name, [this.childsName]:[]}
  }

  copy(cut:Boolean) {
    this.copia=JSON.parse(JSON.stringify({...this.node, cut:cut}))
    this.copiaRef=this.node
    console.log("Copia", this.copia)
  }

  paste() {
    this.show()
    this.node[this.childsName].splice(this.node.i,1,this.copia[this.childsName][this.copia.i]);  
    if (this.copia.cut==true) {
      this.copiaRef[this.childsName].splice(this.copia.i,1);  
    }
  }

  del() {
    this.node[this.childsName].splice(this.node.i,1);
  }

  setPath(event:Event) {
    console.log("SetPath", event.currentTarget, event.target )
    let element:any = event.currentTarget;
    this.path=[]
    this.getPath(element)
    event.stopPropagation();
    console.log("set path=", this.path);    
  }

  getPath(element:any) {
    if (element && element.parentElement) {
      if (element.dataset['parent'])
         this.path.unshift(element.dataset['parent']);
      this.getPath(element.parentElement)
    }
  }
    
  fixNode(node:any, i:number) {
    this.setNode({...node, i:i})      
  } 

  setNode(node:any) {
    console.log("setNode",node)
    this.node={...node}
    this.setBranch.emit(node)
  }

  // Drag & Drop
  show() {
    console.log("Show Copy", this.copia)
    console.log("Show Node", this.node)
  }

  onFocus(event:Event) {
    console.log("Focus", event.currentTarget, event.target)
    this.element = event.currentTarget;
    console.log(this.element.id,this.element.tagName)
    if (this.element.tagName==="INPUT") 
      this.element.parentElement.setAttribute("style", "background-color: red;")         
    else
      this.element.setAttribute("style", "background-color: red;");      
  }

  onBlur(event:Event) {
    console.log("Blur")
    this.element = event.currentTarget;
    if (this.element.tagName==="INPUT") 
      this.element.parentElement.setAttribute("style", "background-color: green;")         
    else
      this.element.setAttribute("style", "background-color: green;"); 
  }

  dragStart(ev:any, node:any, i:number) {
    ev.stopPropagation()
    ev.dataTransfer.setData("data", JSON.stringify({...node, i:i, cut:false}));
  } 

  allowDrop(ev:any) {
    ev.preventDefault();
  }
  
  drop(ev:any, node:any, i:number) {
    ev.stopPropagation()
    this.copia = JSON.parse(ev.dataTransfer.getData("data"))
    this.node = {...node, i:i}
    this.paste()
  }

// End Drag & Drop

onChange(tree, i, event:any) {
  let n:any = this.entityService.db[this.catalogName].find((n:any) => n[this.nodeName]==event);
  tree[i]={"id":n["id"], [this.nodeName]:event};
  console.log(tree[i]); 
}

readCatalog(catalogName, sort) { 
this.entityService.readPage(catalogName,0,100,sort).subscribe({
  next: (data) => {
    this.status = "Catalogo listo...";
  },
  error: (error) => {
    console.log("ListComponent", `Error Code: ${error.status}\nMessage: ${error.message}`);
    this.status = error.message;
  }
  })
}

readTree(entityName) {   
  this.entityService.readTree(entityName).subscribe({
    next: (data) => {
      this.copia = this.tree = this.node = {[this.nodeName]:"Root", [this.childsName]:data};
      this.status = "Consulta lista...";
    },
    error: (error) => {
      console.log("ListComponent", `Error Code: ${error.status}\nMessage: ${error.message}`);
      this.status = error.message;
    }
  }); 
}

saveTree() {
  //let tree = JSON.parse(JSON.stringify(this.tree[this.childsName]));
  //let tree = JSON.stringify(this.tree[this.childsName]);
  let tree = this.tree[this.childsName]
  console.log("SaveTree", tree);
  //
  this.entityService.saveTree(this.entityName, tree).subscribe({
    next: (data) => {
      console.log("SaveTree", data);
      this.status = "Registro efectuado...";
    },
    error: (error) => {
      console.log("ListComponent", `Error Code: ${error.status}\nMessage: ${error.message}`);
      this.status = error.message;
    }
  });
  //   
}

} //End Class

/*
empresa =
{
  "id": 1,
  "area": "DDI",
  "orden": 10000,
  "areas": [
      {
          "id": 2,
          "area": "area1",
          "orden": 20000,
          "areas": []
      }
  ]
}
//
  empresa =  {"area":"Empresa",
              "areas":[{"area":"Area.1","areas":[]},
             {"area":"Area.2","areas":[
              {"area":"Area.2.1","areas":[
                {"area":"Area.2.1.1","areas":[]},
                {"area":"Area.2.1.2","areas":[]},                
              ]},
              {"area":"Area.2.2","areas":[]},
              {"area":"Area.2.3","areas":[]},              
             ]},
             {"area":"Area.3","areas":[]}]}
        
 //
    empresa =  {"area":"Empresa",
    "areas":[{"area":"Area.1","areas":[]},
              {"area":"Area.2","areas":[]},
              {"area":"Area.3","areas":[]}]}
//

reloadComponent(){
    return
    console.log("Current route I am on:",this.router.url);
    let url=this.router.url;
    this.router.navigateByUrl('/',{skipLocationChange:true}).then(()=>{
      this.router.navigate([`/${url}`]).then(()=>{
        console.log(`After navigation I am on:${this.router.url}`)
      })
    })
  }

/**** Arbol

getArbol(arbol:any,lvl:number):any {
  console.log("get path=",this.path)
  return this.path.length==lvl ? arbol : this.getArbol(arbol.childs[this.path[lvl++]],lvl);
}

*/

