/**
 * Simple alert component
 * 
 * Props: 
 * - message - string 
 * 
 */
 function Alert({ message }) {
    console.log("*Alert", {message})
    
    return <div className="Alert">{message}</div>
}

export default Alert;