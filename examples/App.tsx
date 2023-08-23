import InlinePicker from './containers/InlinePicker'
import ModalPicker from './containers/ModalPicker'

function App() {
  return <>
    <header
      className="text-center text-2xl text-blue-700 font-bold py-4"
    >React Mobile Picker</header>
    <section className="px-4">
      <p className="mb-2">React Mobile Picker is a super simple component like iOS picker for React. It's almost unstyled, so you can easily customize it as you like.</p>
      <p className="mb-2">Here are two examples:</p>
    </section>
    <section>
      <p className="px-4 mb-1 text-neutral-400">1. As an inline component</p>
      <InlinePicker />
    </section>
    <section>
      <p className="px-4 mb-1 text-neutral-400">2. In a modal</p>
      <ModalPicker />
    </section>
  </>
}

export default App
