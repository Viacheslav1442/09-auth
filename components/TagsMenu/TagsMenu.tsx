"use client";

import Link from "next/link";
import css from "../../css/TagsMenu.module.css";
import { useState } from "react";

const tags = ["All", "Todo", "Meeting", "Shopping", "Work", "Personal"];

const TagsMenu = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = () => {
        setIsOpen((prev) => !prev);
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    return (
        <div className={css.menuContainer}>
            <button className={css.menuButton} onClick={handleClick}>
                Notes ▾
            </button>
            {isOpen && (
                <ul className={css.menuList}>
                    {tags.map((tag) => (
                        <li key={tag} className={css.menuItem}>
                            <Link
                                href={`/notes/filter/${tag}`}
                                className={css.menuLink}
                                onClick={handleClose}
                            >
                                {tag}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default TagsMenu;