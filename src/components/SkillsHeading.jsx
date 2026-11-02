import FallingText from './FallingText.jsx'
import './SkillsHeading.css'

export default function SkillsHeading() {
  return (
    <div className="skills-heading">
      <h2 className="sr-only">Technical Skills</h2>
      <FallingText
        text="Technical Skills"
        trigger="hover"
        fontSize="inherit"
        gravity={0.9}
        restoreDelay={0.5}
        variant="text"
        split="letters"
        order="sequence"
        bounciness={0.2}
        scatter={0.5}
        stagger={0.035}
        cursorPush={0.75}
        mouseConstraintStiffness={0.15}
        accentColor="#4f4d4c"
        draggable
        wireframes={false}
      />
    </div>
  )
}
