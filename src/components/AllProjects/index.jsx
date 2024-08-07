import { useEffect, useReducer } from 'react';
import Header from '../Header'
import axios from 'axios'
import './index.css'
import ProjectItem from '../ProjectItem';
import {ThreeDots} from 'react-loader-spinner'

const inputOptions = [
    {
        id : "ALL",
        displayText : "All"
    },
    {
        id : "STATIC",
        displayText : "Static"
    },
    {
        id : "RESPONSIVE",
        displayText : "Responsive"
    },
    {
        id : "DYNAMIC",
        displayText : "Dynamic"
    },
    {
        id : "REACT",
        displayText : "React"
    }
]

const initialState = {
    loading : true,
    projectsList : null,
    userInput : "ALL",
    error : false
}

const reducer = (state, action) => {
    switch (action.type) {
        case "All":
            return {
                ...state,
                userInput : action.payload.toUpperCase()
            }
        case "Static":
            return {
                 ...state,
                userInput : action.payload.toUpperCase()
            }
        case "Responsive":
            return {
                ...state,
                userInput : action.payload.toUpperCase()
            }
        case "Dynamic":
            return {
                ...state,
                userInput : action.payload.toUpperCase()
            }
        case "React":
            return {
                ...state,
                userInput : action.payload.toUpperCase()
            }
        case "loading":
            return {
                ...state,
                loading : true,
                error : false
            }
        case "success":
            return {
                ...state,
                loading : false,
                projectsList : action.payload,
                error : false
            }
        case "failure":
            return {
                ...state,
                loading : false,
                error : true
            }
        default:
           return state
    }
}

const AllProjects = () => {
    const [state, dispatch] = useReducer(reducer, initialState)

    useEffect(()=>{
        getFecthData()
    },[state.userInput])

    const getFecthData = async() => {
        try {
            dispatch({type : "loading"})
            const apiUrl = `https://apis.ccbp.in/ps/projects?category=${state.userInput}`
            const projects = await axios.get(apiUrl)
            const data = await projects.data
            dispatch({type : "success", payload : data.projects})
        } catch (error) {
            dispatch({type : "failure"})
        }
    }

    const handleRetryButton = () => {
        getFecthData()
    }

    return(
        <div className='all-projects-bg-container'>
            <Header/>
            <div className='all-projects-main-container'>
                <select className='all-projects-drop-down' onChange={(e)=>dispatch({type : e.target.value, payload : e.target.value})}>
                    {inputOptions.map(eachOption => <option key={eachOption.id}>{eachOption.displayText}</option>)}
                </select>
                <div className='all-projects-projects-container'>
                    {state.loading ? 
                        <div style={{display:"flex", alignItems:"center", justifyContent:"center", width:"100%"}}>
                            <ThreeDots
                                visible={true}
                                height="80"
                                width="80"
                                color="#4fa94d"
                                radius="9"
                                ariaLabel="three-dots-loading"
                                wrapperStyle={{}}
                                wrapperClass=""
                            />
                        </div>
                        :
                        state.error ?
                        <div style={{display:"flex", flexDirection:"column", width:"100%", justifyContent:"center", alignItems:"center"}}>
                            <img src='https://assets.ccbp.in/frontend/react-js/projects-showcase/failure-img.png' className='error-img'/>
                            <h2 style={{textAlign:"center"}}>Oops! Something Went Wrong</h2>
                            <p style={{textAlign:"center"}}>We cannot seem to find the page your are looking for.</p>
                            <button style={{backgroundColor:"blue", color:"white"}} onClick={handleRetryButton}>Retry</button>
                        </div>
                        :
                        <div className='projects'>
                            {state.projectsList &&
                                state.projectsList.map(eachProject => <ProjectItem projectDetails={eachProject} key={eachProject.id}/>)
                            }
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}
export default AllProjects