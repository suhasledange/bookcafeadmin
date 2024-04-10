import { IoCloseSharp } from "react-icons/io5";
const InTransitModal = ({ TransitModal,setTransitModal}) => {

  return TransitModal && (
    <div className='fixed inset-0 z-10 overflow-y-auto'>
    <div className='fixed inset-0 w-full h-full bg-black opacity-40' onClick={() => setTransitModal(false)}>
    </div>
    <div className='flex items-center min-h-screen px-4 py-8'>
      <div className='relative w-full max-w-lg p-4 mx-auto bg-white rounded-sm shadow-lg'>
        <div className='flex justify-end'>
          <button onClick={() => setTransitModal(false)} className='p-2 text-gray-400 rounded-md hover:bg-gray-100'>
            <IoCloseSharp className='text-2xl'/>
          </button>
        </div>
        <div className='max-w-sm mx-auto py-3 space-y-3 text-center'>
          <h4 className='text-lg font-semibold  text-gray-800'>
            In Transit
          </h4>

          <form onSubmit={(e) => e.preventDefault()}>
            <div className='relative mt-3'>
             
            </div>
            <div className='relative mt-3'>
           
            </div>
                <button className='block w-full mt-3 py-3 px-4 font-medium text-sm text-center text-white bg-black hover:bg-gray-900 duration-100 active:bg-gray-800 rounded-sm ring-offset-2 ring-gray-700 focus:ring-2'>
                  Submit
                </button>
          </form>
        </div>
      </div>
    </div>
  </div>
  )
}

export default InTransitModal
