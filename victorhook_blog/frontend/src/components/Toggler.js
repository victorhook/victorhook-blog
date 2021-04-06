import React from 'react'

const Toggler = ({ onClick, textToggled, textNotToggled, className, isToggled}) => {

    const label = React.useRef();
    const toggleSwitch = React.useRef();
    const [toggled, setToggled] = React.useState(isToggled);

    const togglePublicity = checked => {
        setToggled(!toggled);
        if (onClick != undefined && checked != undefined)
            onClick(checked);
    }

    let baseClassName = "form-check form-switch toggler";
    if (className != undefined)
        baseClassName += ` ${className}`;

    if (isToggled != undefined) {
        React.useEffect(() => {
            setToggled(isToggled);
        }, [isToggled]);
    }

    React.useEffect(() => {
        toggleSwitch.current.checked = toggled;
    }, [toggled]);

    return (
        <div className={baseClassName}>
            <input className="form-check-input toggler-switch" type="checkbox" id="public"
                   onInput={e => togglePublicity(e.target.checked)}
                   ref={toggleSwitch}
                   />
            <label className="form-check-label toggler-label" htmlFor="public"
                   ref={label}>{toggled ? textToggled : textNotToggled}</label>
        </div>
    )
}

export default Toggler
