export default function Layout({
    children,
    sidebar,
}: {
    children: React.ReactNode;
    sidebar: React.ReactNode;
}) {
    return (
        <div className="filter-layout">
            <aside className="filter-sidebar">
                {sidebar}
            </aside>
            <main className="filter-main">
                {children}
            </main>
        </div>
    );
}