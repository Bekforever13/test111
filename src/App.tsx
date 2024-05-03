import { Route, Routes } from "react-router-dom"
import { TaskOne, TaskTwo } from "@/pages"
import { AppLayout } from "@/components"

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<AppLayout />}>
        <Route index element={<TaskOne />} />
        <Route path='/second-task' element={<TaskTwo />} />
      </Route>
    </Routes>
  )
}

export { App }
