
const Container = ({children,className}) => {
    return (
      <div className={`w-full py-2 px-2 mx-auto ${className || ""}`}>
           {children}           
      </div>
    )
  }
  
  export default Container
  