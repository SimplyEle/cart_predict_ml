import React, {useRef} from 'react';
import './Toolbar.css'

const DropdownContext = React.createContext({
    open: false,
    setOpen: () => {},
});

function Dropdown({ children, ...props }) {
    const [open, setOpen] = React.useState(false);
    const dropdownRef = React.useRef(null);

    React.useEffect(() => {
        function close(e) {
            if (!dropdownRef.current.contains(e.target)) {
                setOpen(false);
            }
        }

        if (open) {
            window.addEventListener("click", close);
        }
        // cleanup
        return function removeListener() {
            window.removeEventListener("click", close);
        }
    }, [open]);

    return (
        <DropdownContext.Provider value={{ open, setOpen }}>
            <div ref={dropdownRef} className="relative m-1 dropdown">{children}</div>
        </DropdownContext.Provider>
    );
}


function DropdownButton({ children, ...props }) {
    const { open, setOpen } = React.useContext(DropdownContext);

    function toggleOpen() {
        setOpen(!open);
    }

    return (
        <button onClick={toggleOpen} className="rounded px-4 py-2 font-bold text-white bg-sky-900 flex items-center">
            { children }
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width={15} height={15} strokeWidth={4} stroke="currentColor" className={`ml-2 ${open ? "rotate-180" : "rotate-0"}`}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
        </button>
    );
}

function DropdownContent({ children }) {
    const { open } = React.useContext(DropdownContext);

    return (
        <div className={`absolute z-20 rounded border border-gray-300 bg-white overflow-hidden my-1 overflow-y-auto ${ open ? "shadow-md" : "hidden"}`}>
            { children }
        </div>
    );
}

function DropdownList({ children, ...props }) {
    const { setOpen } = React.useContext(DropdownContext);

    return (
        <ul onClick={() => setOpen(false)} className="divide-y divide-gray-200 text-gray-700" {...props}>
            { children }
        </ul>
    );
}

function DropdownItem({ children, ...props }) {
    return (
        <li>
            <button className="py-3 px-5 whitespace-nowrap hover:underline" {...props}>{ children }</button>
        </li>
    );
}

Dropdown.Button = DropdownButton;
Dropdown.Content = DropdownContent;
Dropdown.List = DropdownList;
Dropdown.Item = DropdownItem;

function Toolbar(props) {
    return (
        <Dropdown>
            <Dropdown.Button>Sort</Dropdown.Button>
            <Dropdown.Content>
                <Dropdown.List>
                    <Dropdown.Item>Featured</Dropdown.Item>
                    <Dropdown.Item>Top</Dropdown.Item>
                    <Dropdown.Item>Price: Low to High</Dropdown.Item>
                    <Dropdown.Item>Price: High to Low</Dropdown.Item>
                </Dropdown.List>
            </Dropdown.Content>
        </Dropdown>
    );
}

export default Toolbar;