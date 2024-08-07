import './index.css'

const ProjectItem = props => {
    const {projectDetails} = props
    const {name, image_url} = projectDetails
    return(
        <div className='project-item-bg-container'>
            <img src={image_url} className='project-item-img'/>
            <h2 className='project-item-name'>{name}</h2>
        </div>
    )
}

export default ProjectItem