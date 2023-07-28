"use client";
// Import necessary dependencies
import React, { useEffect, useRef, useState } from "react";
import { HiArrowDown, HiChevronDown, HiXCircle } from "react-icons/hi";

const SelectDropdown = ({ placeHolder, options, onChange, initialOption }) => {
    // State variables
    const [showMenu, setShowMenu] = useState(false);
    const [selectedValue, setSelectedValue] = useState(null);

    useEffect(() => {
        // Event listener to close the dropdown when clicking outside
        const handler = (e) => {
            if (inputRef.current && !inputRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };
        window.addEventListener("click", handler);

        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener("click", handler);
        };
    });

    const [searchValue, setSearchValue] = useState("");
    const searchRef = useRef();
    const inputRef = useRef();

    useEffect(() => {
        setSearchValue("");
        if (showMenu && searchRef.current) {
            searchRef.current.focus();
        }
    }, [showMenu]);

    useEffect(() => {
        // Find the country object with the matching name
        const selectedOption = options.find(
            (option) => option.value === initialOption
        );
        if (selectedOption) {
            setSelectedValue(selectedOption);
        }
    }, [initialOption]);

    const getOptions = () => {
        if (!searchValue) {
            return options;
        }
        return options.filter(
            (option) =>
                option.label.toLowerCase().indexOf(searchValue.toLowerCase()) >=
                0
        );
    };

    // Click event handler for input
    const handleInputClick = (e) => {
        setShowMenu(!showMenu);
    };

    // Function to determine the display value
    const getDisplay = () => {
        if (selectedValue) {
            return selectedValue.label;
        }
        return placeHolder;
    };

    // Click event handler for menu items
    const onItemClick = (option) => {
        setSelectedValue(option);
        onChange(option);
    };

    // Function to check if an option is selected
    const isSelected = (option) => {
        if (!selectedValue) {
            return false;
        }
        return selectedValue.value === option.value;
    };

    return (
        // Dropdown Container
        <div className="relative w-full rounded-xl border bg-white">
            {/* Dropdown Input */}
            <div
                ref={inputRef}
                onClick={handleInputClick}
                className="relative flex w-full cursor-pointer select-none items-center justify-between overflow-hidden rounded-xl border-0 bg-white p-2 text-sm text-primary focus:ring-1 focus:ring-gray-200"
            >
                {/* Dropdown selected value */}
                <div>{getDisplay()}</div>
                <div className="absolute right-0 my-auto flex h-full items-center bg-gradient-to-l from-white via-white via-50% to-transparent pl-5 pr-1.5">
                    {selectedValue && (
                        <div
                            onClick={() => {
                                setSelectedValue(null);
                                onChange(null);
                            }}
                            className="flex mr-1 cursor-pointer items-center text-gray-400 bg-surface px-1 py-[2px] rounded-md"
                        >
                            <HiXCircle className="mr-1 " />
                            <span className="text-sm">Clear</span>
                        </div>
                    )}
                    <HiChevronDown className="h-5 w-5" />
                </div>
            </div>
            {/* Dropdown Menu */}
            {showMenu && (
                <div className="sp-shadow absolute w-full min-w-min translate-y-1 gap-1 rounded-xl border bg-white px-1">
                    {/* Dropdown Item */}
                    {getOptions().map((option) => (
                        <div
                            onClick={() => onItemClick(option)}
                            key={option.value}
                            className={`${
                                isSelected(option) && "bg-surface"
                            }  my-1 cursor-pointer gap-1.5 rounded-xl p-2 text-primary hover:bg-surface`}
                        >
                            {option.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SelectDropdown;
