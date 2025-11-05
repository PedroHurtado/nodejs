!function menu(){
    document.addEventListener('click',async (ev)=>{

        //event delegation
        //https://dmitripavlutin.com/javascript-event-delegation/
        //ev.target
        //https://developer.mozilla.org/en-US/docs/Web/HTML/How_to/Use_data_attributes

        ev.stopPropagation()
        ev.preventDefault()
        const node = ev.composedPath().find(n=>n.dataset && 'page' in n.dataset)
        if(node){
            const {page} = node.dataset
            //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
            const url = `./pages/${page}.js`
            const module = await import(url)            

            /*
                solo puede haber un export default en un modulo
                import name, {} from './module.js'
            */
            module.default()
        }
    })
}()

