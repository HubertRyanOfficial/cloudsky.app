(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{8312:function(__unused_webpack_module,__unused_webpack_exports,__webpack_require__){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return __webpack_require__(4266)}])},4266:function(__unused_webpack_module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{default:function(){return Home}});var jsx_runtime=__webpack_require__(5893),head=__webpack_require__(9008),head_default=__webpack_require__.n(head),react=__webpack_require__(7294);let AppContext=(0,react.createContext)(null),InitialState={isLoading:!0,notes:[],selected:null,tags:[]},ACTIONS={INITIAL_STATE:"INITIAL_STATE",ADD_NEW_NOTE:"ADD_NEW_NOTE",EDIT_NOTE:"EDIT_NOTE",REMOVE_NOTE:"REMOVE_NOTE",SELECT_NOTE:"SELECT_NOTE",FORCE_NEW_NOTE:"FORCE_NEW_NOTE"};function appReducer(state,action){switch(action.type){case ACTIONS.INITIAL_STATE:return{...state,...action.payload};case ACTIONS.ADD_NEW_NOTE:return{...state,notes:[...state.notes,action.payload]};case ACTIONS.EDIT_NOTE:{let notes=[...state.notes],noteIndex=notes.findIndex(item=>item.id==state.selected.id);return notes[noteIndex]={...notes[noteIndex],title:action.payload.title,content:action.payload.content},{...state,notes,selected:null}}case ACTIONS.SELECT_NOTE:{let noteIndex1=state.notes.findIndex(item=>item.id==action.payload);return{...state,selected:state.notes[noteIndex1]}}case ACTIONS.REMOVE_NOTE:{let notes1=state.notes.filter(item=>item.id!=action.payload);return{...state,notes:notes1,selected:null}}case ACTIONS.FORCE_NEW_NOTE:return{...state,selected:null};default:return state}}function useApp(){let context=(0,react.useContext)(AppContext);if(!context)throw Error("useApp must be used within a AppProvider");let[state,dispatch]=context,addNewNote=note=>{let id=state.notes.length+1;dispatch({type:ACTIONS.ADD_NEW_NOTE,payload:{...note,id}})},editNote=note=>{dispatch({type:ACTIONS.EDIT_NOTE,payload:{...note}})},removeNote=id=>{dispatch({type:ACTIONS.REMOVE_NOTE,payload:id})},selectNote=id=>{dispatch({type:ACTIONS.SELECT_NOTE,payload:id})},forceNewNote=()=>{dispatch({type:ACTIONS.FORCE_NEW_NOTE})};return{...state,addNewNote,editNote,removeNote,selectNote,forceNewNote}}function AppProvider(param){let{children}=param,[state,dispatch]=(0,react.useReducer)(appReducer,InitialState),contextValues=(0,react.useMemo)(()=>[state,dispatch],[state]);return(0,react.useEffect)(()=>{async function loadApp(){let response=await localStorage.getItem("@younotyapp-notes"),persistedData=await JSON.parse(response);dispatch({type:ACTIONS.INITIAL_STATE,payload:{...persistedData,isLoading:!1}})}setTimeout(()=>{loadApp()},2500)},[]),(0,react.useEffect)(()=>{if(!state.isLoading){let newState={...state,isLoading:!0},persistedState=JSON.stringify(newState);localStorage.setItem("@younotyapp-notes",persistedState)}},[state]),(0,jsx_runtime.jsx)(AppContext.Provider,{value:contextValues,children:children})}var App_module=__webpack_require__(9828),App_module_default=__webpack_require__.n(App_module),lottie_react_esm=__webpack_require__(9879),Notes_module=__webpack_require__(6529),Notes_module_default=__webpack_require__.n(Notes_module),NoteItem_module=__webpack_require__(9460),NoteItem_module_default=__webpack_require__.n(NoteItem_module);let NoteItem=param=>{let{item}=param,{selectNote}=useApp(),randomColor=Math.floor(16777215*Math.random()).toString(16);return(0,jsx_runtime.jsxs)("div",{className:NoteItem_module_default().container,onClick:()=>selectNote(item.id),children:[(0,jsx_runtime.jsx)("div",{className:NoteItem_module_default().indentifier,style:{backgroundColor:"#".concat(randomColor)}}),(0,jsx_runtime.jsx)("strong",{className:NoteItem_module_default().title,style:{color:item.title?"#000000":"#dddddd"},children:item.title?item.title:"Sem-T\xedtulo"}),!!item.content&&(0,jsx_runtime.jsx)("span",{className:NoteItem_module_default().content,children:item.content.length>30?item.content.substring(0,30).concat("..."):item.content})]})},Notes=()=>{let{notes,forceNewNote}=useApp();return 0==notes.length?(0,jsx_runtime.jsx)(EmptyState,{}):(0,jsx_runtime.jsxs)("div",{className:Notes_module_default().container,children:[(0,jsx_runtime.jsx)("div",{className:Notes_module_default().newNote,onClick:()=>forceNewNote(),children:(0,jsx_runtime.jsx)("strong",{children:"Criar uma nova nota"})}),notes.map(item=>(0,jsx_runtime.jsx)(NoteItem,{item:item},item.id))]})},EmptyState=()=>(0,jsx_runtime.jsx)("div",{className:Notes_module_default().emptyContainer,children:(0,jsx_runtime.jsx)("span",{children:"Aqui ficar\xe3o todas as suas notas. Comece a criar suas notas no lado direito!"})});var Board_module=__webpack_require__(6406),Board_module_default=__webpack_require__.n(Board_module),motion=__webpack_require__(3566),SelectTag_module=__webpack_require__(2896),SelectTag_module_default=__webpack_require__.n(SelectTag_module);function SelectTag(){let[showTags,setShowTags]=(0,react.useState)(!0);return(0,jsx_runtime.jsx)("div",{children:(0,jsx_runtime.jsx)(motion.E.div,{initial:{opacity:0,width:150},animate:{width:[150,200],opacity:1},className:SelectTag_module_default().container,children:(0,jsx_runtime.jsx)("span",{children:"Selecionar tag"})})})}let Board=()=>{let{addNewNote,editNote,selected,removeNote}=useApp(),[title,setTitle]=(0,react.useState)(""),[content,setContent]=(0,react.useState)("");return(0,react.useEffect)(()=>{setTitle((null==selected?void 0:selected.title)||""),setContent((null==selected?void 0:selected.content)||"")},[selected]),(0,jsx_runtime.jsxs)("div",{className:Board_module_default().container,children:[(0,jsx_runtime.jsx)(SelectTag,{}),(0,jsx_runtime.jsxs)("div",{className:Board_module_default().inputContainer,children:[(0,jsx_runtime.jsxs)("div",{className:Board_module_default().inputContent,children:[(0,jsx_runtime.jsx)("input",{value:title,className:Board_module_default().inputItem,maxLength:50,placeholder:"Nova nota",onChange:e=>setTitle(e.target.value),autoCapitalize:"words",autoFocus:!0}),(0,jsx_runtime.jsxs)("div",{className:Board_module_default().options,children:[(0,jsx_runtime.jsx)("span",{onClick:()=>void((title||content)&&(selected?editNote({title,content}):(addNewNote({title,content}),setTitle(""),setContent("")))),className:Board_module_default().optionSave,style:{color:title||content?"#ee5d47":"#ddd"},children:"Salvar"}),selected&&(0,jsx_runtime.jsx)("span",{onClick:()=>removeNote(selected.id),className:Board_module_default().optionDelete,children:"Excluir"})]})]}),(0,jsx_runtime.jsx)("div",{className:Board_module_default().separator})]}),(0,jsx_runtime.jsx)("textarea",{value:content,className:Board_module_default().inputItemContent,placeholder:"Ideias na nova nota",onChange:e=>setContent(e.target.value),autoCapitalize:"words"})]})};var _98092_loading_namespaceObject=JSON.parse('{"v":"5.5.8","fr":50,"ip":0,"op":147,"w":800,"h":600,"nm":"Paperplane","ddd":0,"assets":[{"id":"comp_0","layers":[{"ddd":0,"ind":1,"ty":4,"nm":"planete Outlines - Group 4","sr":1,"ks":{"o":{"a":1,"k":[{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":0,"s":[0]},{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":38,"s":[50]},{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":88,"s":[50]},{"t":120,"s":[0]}],"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":1,"k":[{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"t":0,"s":[468.336,323.378,0],"to":[-29,0,0],"ti":[29,0,0]},{"t":102,"s":[294.336,323.378,0]}],"ix":2},"a":{"a":0,"k":[453.672,304.756,0],"ix":1},"s":{"a":0,"k":[50,50,100],"ix":6}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[6.742,0],[0.741,-0.14],[0,0.074],[13.484,0],[1.669,-0.361],[19.79,0],[3.317,-19.082],[2.691,0],[0,-13.484],[-0.048,-0.629],[2.405,0],[0,-6.742],[-6.742,0],[0,0],[0,6.743]],"o":[[-0.781,0],[0.001,-0.074],[0,-13.484],[-1.778,0],[-3.594,-18.742],[-20.03,0],[-2.421,-0.804],[-13.485,0],[0,0.642],[-1.89,-1.199],[-6.742,0],[0,6.743],[0,0],[6.742,0],[0,-6.742]],"v":[[75.134,16.175],[72.85,16.396],[72.856,16.175],[48.44,-8.241],[43.262,-7.685],[3.406,-40.591],[-36.571,-6.995],[-44.269,-8.241],[-68.685,16.175],[-68.604,18.079],[-75.133,16.175],[-87.341,28.383],[-75.133,40.592],[75.134,40.592],[87.342,28.383]],"c":true},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":0,"k":[0.815686334348,0.823529471603,0.827451040231,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[453.672,304.756],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 4","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":151,"st":0,"bm":0},{"ddd":0,"ind":2,"ty":4,"nm":"Merged Shape Layer","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.547],"y":[0]},"t":0,"s":[0]},{"i":{"x":[0.845],"y":[1]},"o":{"x":[0.333],"y":[0]},"t":77,"s":[35]},{"t":150,"s":[0]}],"ix":10},"p":{"a":1,"k":[{"i":{"x":0.667,"y":1},"o":{"x":0.333,"y":0},"t":0,"s":[390.319,298.2,0],"to":[0,-2.583,0],"ti":[0,0,0]},{"i":{"x":0.667,"y":1},"o":{"x":0.333,"y":0},"t":44,"s":[390.319,282.7,0],"to":[0,0,0],"ti":[0,0,0]},{"i":{"x":0.667,"y":1},"o":{"x":0.333,"y":0},"t":110,"s":[390.319,319.25,0],"to":[0,0,0],"ti":[0,0,0]},{"t":150,"s":[390.319,298.2,0]}],"ix":2},"a":{"a":0,"k":[664.319,256.2,0],"ix":1},"s":{"a":0,"k":[100,100,100],"ix":6}},"ao":0,"shapes":[{"ty":"gr","it":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0]],"v":[[18.967,-3.189],[-18.967,19.935],[-0.949,-19.935]],"c":true},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":0,"k":[0.7098039215686275,0.13725490196078433,0.13725490196078433,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[236.879,292.737],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false},{"ty":"tr","p":{"a":0,"k":[633.939,275.369],"ix":2},"a":{"a":0,"k":[236.879,292.737],"ix":1},"s":{"a":0,"k":[50,50],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"planete Outlines - Group 1","np":1,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false},{"ty":"gr","it":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0]],"v":[[-98.335,64.79],[-105.619,4.984],[105.619,-64.79],[-80.316,24.919]],"c":true},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":0,"k":[0.8156862745098039,0.00784313725490196,0.10588235294117647,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[316.247,247.882],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 2","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false},{"ty":"tr","p":{"a":0,"k":[673.623,252.941],"ix":2},"a":{"a":0,"k":[316.247,247.882],"ix":1},"s":{"a":0,"k":[50,50],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"planete Outlines - Group 2","np":1,"cix":2,"bm":0,"ix":2,"mn":"ADBE Vector Group","hd":false},{"ty":"gr","it":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"v":[[-133.812,-42.171],[133.812,-75.141],[5.765,75.141],[-61.708,18.402],[124.227,-71.307],[-87.011,-1.534]],"c":true},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":0,"k":[1,0.3058823529411765,0.3058823529411765,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[297.638,254.4],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 3","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false},{"ty":"tr","p":{"a":0,"k":[664.319,256.2],"ix":2},"a":{"a":0,"k":[297.638,254.4],"ix":1},"s":{"a":0,"k":[50,50],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"planete Outlines - Group 3","np":1,"cix":2,"bm":0,"ix":3,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":151,"st":0,"bm":0},{"ddd":0,"ind":3,"ty":4,"nm":"planete Outlines - Group 5","sr":1,"ks":{"o":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"t":0,"s":[0]},{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"t":45,"s":[100]},{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"t":102,"s":[100]},{"t":150,"s":[0]}],"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":1,"k":[{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"t":0,"s":[327.38,267.583,0],"to":[25.833,0,0],"ti":[-25.833,0,0]},{"t":150,"s":[482.38,267.583,0]}],"ix":2},"a":{"a":0,"k":[171.76,193.166,0],"ix":1},"s":{"a":0,"k":[50,50,100],"ix":6}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[13.485,0],[4.38,-4.171],[21.913,0],[3.575,-18.765],[1.851,0],[0,-13.484],[-0.011,-0.291],[1.599,0],[0,-6.743],[-6.742,0],[0,0],[0,13.485]],"o":[[-6.526,0],[-0.793,-21.719],[-19.806,0],[-1.734,-0.391],[-13.485,0],[0,0.293],[-1.4,-0.559],[-6.742,0],[0,6.742],[0,0],[13.485,0],[0,-13.484]],"v":[[59.669,-8.242],[42.84,-1.506],[2.287,-40.592],[-37.576,-7.638],[-42.962,-8.242],[-67.378,16.174],[-67.356,17.049],[-71.878,16.174],[-84.086,28.383],[-71.878,40.591],[59.669,40.591],[84.086,16.174]],"c":true},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":0,"k":[0.816000007181,0.823999980852,0.827000038297,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[171.76,193.166],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 5","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":151,"st":0,"bm":0}]}],"layers":[{"ddd":0,"ind":1,"ty":0,"nm":"Pre-comp 1","refId":"comp_0","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[406,306,0],"ix":2},"a":{"a":0,"k":[400,300,0],"ix":1},"s":{"a":0,"k":[179,179,100],"ix":6}},"ao":0,"w":800,"h":600,"ip":0,"op":147,"st":0,"bm":0}],"markers":[]}');function App(){let{isLoading}=useApp();return isLoading?(0,jsx_runtime.jsx)(Loading,{}):(0,jsx_runtime.jsxs)("main",{className:App_module_default().main,children:[(0,jsx_runtime.jsx)(Notes,{}),(0,jsx_runtime.jsx)(Board,{})]})}function Loading(){return(0,jsx_runtime.jsx)("div",{className:App_module_default().loadingContainer,children:(0,jsx_runtime.jsx)(lottie_react_esm.J5,{src:_98092_loading_namespaceObject,autoplay:!0,loop:!0,style:{width:300}})})}var Home_module=__webpack_require__(7160),Home_module_default=__webpack_require__.n(Home_module);function Home(){return(0,jsx_runtime.jsxs)("div",{className:Home_module_default().container,children:[(0,jsx_runtime.jsxs)(head_default(),{children:[(0,jsx_runtime.jsx)("title",{children:"Cloudsky - Suas ideias, notas e projetos, seu lugar para a organiza\xe7\xe3o."}),(0,jsx_runtime.jsx)("link",{rel:"icon",href:"/favicon.ico"}),(0,jsx_runtime.jsx)("meta",{name:"description",content:"Suas ideias, notas e projetos, seu lugar para a organiza\xe7\xe3o."})]}),(0,jsx_runtime.jsx)(AppProvider,{children:(0,jsx_runtime.jsx)(App,{})})]})}},9828:function(module){module.exports={main:"App_main__PMFR_",loadingContainer:"App_loadingContainer__gRwNz"}},6406:function(module){module.exports={container:"Board_container__EVlqU",inputContainer:"Board_inputContainer__BD6cd",inputContent:"Board_inputContent__53LE7",optionSave:"Board_optionSave__CLC07",optionDelete:"Board_optionDelete__sZ2qH",separator:"Board_separator__s3ZiI",inputItemContent:"Board_inputItemContent__jlsGa"}},9460:function(module){module.exports={container:"NoteItem_container__G1V_J",title:"NoteItem_title__WHv3I",content:"NoteItem_content__NPwiz",indentifier:"NoteItem_indentifier__iuS6l"}},6529:function(module){module.exports={container:"Notes_container__BioA1",newNote:"Notes_newNote__FAFwa",emptyContainer:"Notes_emptyContainer__4Eeo4"}},2896:function(module){module.exports={container:"SelectTag_container__aRdvr"}},7160:function(module){module.exports={container:"Home_container__bCOhY"}}},function(__webpack_require__){__webpack_require__.O(0,[388,641,774,888,179],function(){return __webpack_require__(__webpack_require__.s=8312)}),_N_E=__webpack_require__.O()}]);