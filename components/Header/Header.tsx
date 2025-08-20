import css from "./Header.module.css";
import AuthNavigation from "@/components/AuthNavigation/AuthNavigation";

export default function Header() {
    return (
        <header className={css.header}>
            <nav className={css.navigation}>
                <ul className={css.navigationList}>
                    <AuthNavigation />
                </ul>
            </nav>
        </header>
    );
}
