import React from 'react'

type Props = {
  variant?: 'primary' | 'secondary' | "outline",
  className?: string,
  children: React.ReactNode,
  onClick?: () => void,
  up?: string,
  type?: "submit" | "reset" | "button" | undefined
  disabled?: boolean,
  isLoading?: boolean,
  animated?: boolean
}

const MainButton = ({ animated = true, isLoading = false, disabled = false, type, onClick, variant = "primary", className, children, up }: Props) => {
  return (
    <button
      disabled={disabled}
      type={type}
      onClick={onClick}
      className={`group lando-transition uppercase text-md w-fit h-fit py-[.6em] px-[.8em] rounded-md cursor-pointer flex flex-col relative whitespace-nowrap shadow-2xs
      hover:scale-105 active:scale-95 hover:shadow-none transition-all duration-300 leading-4
      ${variant === "primary" && "bg-primary-foreground hover:bg-primary-foreground/90"}
      ${variant === "secondary" && "bg-secondary-foreground hover:bg-secondary-foreground/90"}
      ${variant === "outline" && `border border-primary-foreground backdrop-blur-2xl hover:brightness-110`}
      text-white ` + className}
      >
        {isLoading ? (
          <div>Loading</div>
        ) : (
          animated ? (
            <>
              <div className='flex py-0.5 flex-col gap-1 relative overflow-hidden'>
                <span className=''>
                  { typeof children !== "string" ? children : Array.from(children).map((char, index) => (
                      <span
                        key={index}
                        style={{ transitionDelay: `${index * 20}ms` }}
                        className={`
                          inline-block
                          transition-all duration-300
                          translate-y-0
                          group-hover:-translate-y-5
                          ${variant === "primary" && "text-primary"}
                          ${variant === "secondary" && "text-secondary"}
                          ${variant === "outline" && "text-primary-foreground"}
                        `}
                      >
                        {char === " " ? "\u00A0" : char}
                      </span>
                  )) }
                </span>

                { typeof children === "string" && (
                  <span className="absolute top-full left-1/2 -translate-x-1/2 mt-0.5 flex">
                    {Array.from(children).map((char, index) => (
                      <span
                        key={index}
                        style={{ transitionDelay: `${index * 20}ms` }}
                        className={`
                          inline-block
                          transition-all duration-300
                          translate-y-0
                          ${up ? up : "group-hover:-translate-y-5"}
                          ${variant === "primary" && "text-primary"}
                          ${variant === "secondary" && "text-secondary"}
                          ${variant === "outline" && "text-primary-foreground"}
                        `}
                      >
                        {char === " " ? "\u00A0" : char}
                      </span>
                    ))}
                  </span>
                ) }
              </div>
            </>
          ) : (
            <span
              className={`
                flex gap-2 w-full justify-center items-center
                transition-all duration-300
                ${variant === "primary" && "text-primary"}
                ${variant === "secondary" && "text-secondary"}
                ${variant === "outline" && "text-primary-foreground"}
              `}
            >
              {children}
            </span>
          )
        )}
    </button>
  )
}

export default MainButton