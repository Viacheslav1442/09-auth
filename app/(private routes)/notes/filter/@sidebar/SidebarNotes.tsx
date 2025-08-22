"use client";

import Link from "next/link";
import css from "./SidebarNotes.module.css";

const tags = ["All", "Work", "Personal", "Important"];

export default function SidebarNotes() {
    return (
        <aside className={css.sidebar}>
            <ul className={css.menuList}>
                {tags.map((tag) => {

                    return (
                        <li key={tag} className={css.menuItem}>
                            <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
                                {tag}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </aside>
    );
}