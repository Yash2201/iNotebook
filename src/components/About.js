import React, { useContext,useEffect } from 'react'
import noteContext from '../context/Notes/noteContext'

const About = () => {
  const a = useContext(noteContext);
  useEffect(() => {
    a.update();
    // eslint-disable-next-line 
  }, [])
  

  return (
    <div>
      this is about {a.state.name} and he is in class {a.state.class}
    </div>
  )
}

export default About