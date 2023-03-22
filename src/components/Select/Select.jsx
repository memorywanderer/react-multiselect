import { useEffect, useRef, useState } from "react"
import styles from "./select.module.css"

export default function Select({ multiple, value, onChange, options }) {
  const [isOpen, setIsOpen] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState(0)

  const selectRef = useRef()

  useEffect(() => {
    if (isOpen) {
      setHighlightedIndex(0)
    }
  }, [isOpen])

  useEffect(() => {
    const handler = (e) => {
      if (e.target != selectRef.current)
        return

      switch (e.code) {
        case "Enter":
        case "Space":
          setIsOpen(prev => !prev)
          if (isOpen) selectOption(options[highlightedIndex])
          break
        case "ArrowUp":
        case "ArrowDown":
          if (!isOpen) {
            setIsOpen(true)
            break
          }
          const newValue = highlightedIndex + (e.code === "ArrowDown" ? 1 : -1)

          if (newValue >= 0 && newValue < options.length) {
            setHighlightedIndex(newValue)
          }
          break
        case "Escape":
          setIsOpen(false)
          break
      }

    }

    selectRef.current.addEventListener('keydown', handler)

    return () => {
      selectRef.current.removeEventListener('keydown', handler)
    }
  }, [isOpen, highlightedIndex, options])

  const clearOptions = () => {
    multiple ? onChange([]) : onChange(undefined)
  }

  const selectOption = (option) => {
    if (multiple) {
      // if option already exists
      if (value.includes(option)) {
        onChange(value.filter((opt) => opt !== option))
      } else {
        onChange([...value, option])
      }
    } else {
      onChange(option)
    }
  }

  const isOptionSelected = (option) => {
    return (multiple) ? value.includes(option) : option === value
  }

  return (
    <div
      ref={selectRef}
      onClick={() => setIsOpen(!isOpen)}
      onBlur={() => setIsOpen(false)}
      tabIndex={0}
      className={styles["select__container"]}
    >
      <span className={styles["select__value"]}>
        {multiple ? value.map(v => {
          console.log(v);
          return (
            <button
              className={styles["select__option-badge"]}
              key={v.value}
              onClick={(e) => {
                e.stopPropagation()
                selectOption(v)
              }}
            >
              {v.label}
              <span className={styles["select__remove-btn"]}>&times;</span>
            </button>
          )
        }) : value?.label}
      </span>
      <button
        onClick={(e) => {
          e.stopPropagation()
          clearOptions()
        }}
        className={styles["select__clear-btn"]}
      >
        &times;
      </button>
      <div className={styles["select__divider"]}></div>
      <div className={styles["select__caret"]}></div>
      <ul className={`${styles['select__options']} ${isOpen ? styles.show : ''}`}>
        {options.map((option, index) => (
          <li
            key={option.label}
            onClick={(e) => {
              e.stopPropagation()
              selectOption(option)
              setIsOpen(false)
            }}
            onMouseEnter={() => setHighlightedIndex(index)}

            className={
              `${styles['select__option']} 
              ${isOptionSelected(option) ? styles["select__option--selected"] : ""} 
              ${highlightedIndex === index ? styles["select__option--highlighted"] : ""}`
            }
          >
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  )
}
