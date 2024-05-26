import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { HOST_URL } from './env.js'
//// PAGES ////
import { PageBuilder } from './PageBuilder.jsx'
//// COMPONENTS ////
import { Header } from "./components/Header"
import { Footer } from "./components/Footer"
//// CSS ////
import "@codegouvfr/react-dsfr/dsfr/dsfr.css"
import "./index.css"
import "@codegouvfr/react-dsfr/dsfr/utility/icons/icons.css"
//// FUNCTIONS ////
import { fetchData } from './functions/fetcher.js'
import { ScrollToTop } from './functions/ScrollToTop.jsx'

function App() {
  const [home, setHome] = useState('')
  const [alert, setAlert] = useState('')
  const [links, setLinks] = useState([])
  const [pages, setPages] = useState([])
  const [articles, setArticles] = useState ([])
  const [axes, setAxes] = useState ([])
  const [toolsAndDevices, setToolsAndDevices] = useState([])

// console.clear()
console.warn = function() {};

  const originalConsoleError = console.error;

  console.error = function (message) {
    if (message.includes('Each child in a list should have a unique')) {
      return;
    }
    originalConsoleError.apply(console, arguments);
  };

//////////////////////// FETCHING ////////////////////////
    useEffect(()=>{
      document.title = "Société Numérique"
      ///HOME///
      const loadHome = async()=>{
        try{
            const resp = await fetchData(HOST_URL+'/api/page-accueil')
            setHome(resp.data.attributes.page_accueil)
        }catch(e){
            console.log("Erreur",e)
        }
    }
      ///ALERTE///
      const loadAlert = async()=>{
          try{
              const resp = await fetchData(HOST_URL+'/api/alerte')
              setAlert(resp.data.attributes.message)
          }catch(e){
              console.log("Erreur",e)
          }
      }
      ///LIENS///
      const loadLinks = async()=>{
        try{
            const resp = await fetchData(HOST_URL+'/api/navigations')
            setLinks(resp.data)
        }catch(e){
            console.log("Erreur",e)
        }
      }
      ///PAGES///
      const loadPages = async()=>{
        try{
            const resp = await fetchData(HOST_URL+'/api/pages')
            setPages(resp.data)
        }catch(e){
            console.log("Erreur",e)
        }
      }
      ///ARTICLES///
      const loadArticles = async()=>{
        try{
            const respBreves = await fetchData(HOST_URL+'/api/breves')
            const respStrategies = await fetchData(HOST_URL+'/api/publications-strategiques')
            const respRapports = await fetchData(HOST_URL+'/api/rapports-de-recherches')
            setArticles([respBreves, respStrategies, respRapports])
        }catch(e){
            console.log("Erreur",e)
        }
      }

      const loadAxes = async()=>{
        try{
          const respAxes = await fetchData(HOST_URL+'/api/axes')
          setAxes(respAxes.data)
        }catch(e){
          console.log("Erreur",e)
        }
      }

      const loadToolsAndDevices = async()=>{
        try{
          const toolsAndDevices = await fetchData(HOST_URL+'/api/outils-et-dispositifs')
          setToolsAndDevices(toolsAndDevices.data)
        }catch(e){
          console.log("Erreur",e)
        }
      }

      loadArticles()
      loadHome()
      loadAlert()
      loadLinks()
      loadPages()
      loadAxes()
      loadToolsAndDevices()

      },[])

      const getNestedPath = (pathname) =>{
          switch(pathname){
            case 'rapports-strategiques': return 'nos-ressources/'
            case 'etudes': return 'nos-ressources/'
            case 'notre-revue': return 'nos-ressources/'
            case 'notre-media': return 'nos-ressources/'
            case 'breves': return 'actualites/'
            default: return ''
          }
      }

  return (
  <>
    <BrowserRouter>
    <ScrollToTop/>
      <Header alerte={alert} liens_navbar={links}/>
        <div className='margin-footer'>
        <Routes>
          {articles && articles.map(typeArticle=>
            typeArticle.data.map(data=>{
              const slug = data.attributes.titre_de_la_carte.split(' ').join('-').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'')
              const type = data.attributes.type
              switch(type){
                case "breve":
                    return (
                      <Route 
                       
                        path = {`/actualites/breves/${slug}`} 
                        element={<PageBuilder  data={data.attributes.composants}
                                              dataArticles={[]}
                                              isHome={false}/>}
                      />
                    )
                break
                case "rapport-stratégique":
                    return (
                      <Route 
                       
                        path = {`/nos-ressources/rapports-strategiques/${slug}`} 
                        element={<PageBuilder  data={data.attributes.composants} 
                                              dataArticles={[]}
                                              isHome={false}/>}
                      />
                    )
                break
                case "etude":
                    return (
                      <Route 
                       
                        path = {`/nos-ressources/etudes/${slug}`} 
                        element={<PageBuilder data={data.attributes.composants} 
                                              dataArticles={[]} 
                                              isHome={false}/>}
                      />
                    )
                break
              }
            })
          )}
          {pages &&
            pages.map(page => {
              if (page.attributes.nom_de_page === home){
                return (
                  // eslint-disable-next-line react/jsx-key
                  <Route
                    path="/"
                    element={<PageBuilder data={page.attributes.Composants} 
                                          dataArticles={articles} 
                                          isHome={true}/>}
                  />
                )
              }
            })
          }
          {pages &&
            pages.map(page => {
              return (
                <Route
                  path={`/${getNestedPath(page.attributes.nom_de_page)}${page.attributes.nom_de_page}`}
                  element={<PageBuilder  data={page.attributes.Composants}
                                        dataArticles={articles}
                                        isHome={page.attributes.nom_de_page === home ? true:false}/>}
                />
              )
            })
          }
          {toolsAndDevices && toolsAndDevices.map(item=>{
             const slug = item.attributes.titre_de_la_carte.split(' ').join('-').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'')
              return(
                <Route
                  path={`/nos-missions/${item.attributes.liaison_avec}/${slug}`}
                  element={<PageBuilder  data={item.attributes.Composants}
                                        dataArticles={[]}
                                        isHome={false}/>}
                />
              )
          })
          }
          {axes && 
            axes.map(axe=>{
              return(
                <Route
                  path={`/nos-missions/${axe.attributes.slug}`}
                  element={<PageBuilder data={axe.attributes.Composants}
                                        dataArticles={[]}
                                        dataToolsDevices={toolsAndDevices}
                                        slug={axe.attributes.slug}
                                        isHome={false}/>}
                />
              )
            })
          }
          <Route path="/app" element={<Navigate to="/" />} />
        </Routes>
        </div>
      <Footer/>
    </BrowserRouter>
  </>
  )
}

export default App