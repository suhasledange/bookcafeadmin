import Admin from "./Admin"

const layout = ({children}) => {

  return (
    <>
      <Admin>
        {children}
      </Admin>
    </>
  )
}

export default layout
