import { useEffect, useState } from "react"
import CommandPalette, { filterItems, getItemIndex } from "react-cmdk";

import "react-cmdk/dist/cmdk.css";

const CommandMenu = () => {
    const DEFAULT_PAGE = "root"
    const [page] = useState<"root" | "projects">(DEFAULT_PAGE);
    const [open, setOpen] = useState<boolean>(false);
    const [search, setSearch] = useState<string>("");

    const filteredItems = filterItems(
        [
            {
                heading: "Secrets",
                id: "secrets",
                items: [
                    {
                        id: "add-secret",
                        children: "Add Secret",
                        icon: "DocumentPlusIcon",
                        closeOnSelect: true,
                        onClick: () => {
                            console.log("Click")
                        },
                    }
                ],
            },
            {
                heading: "Global",
                id: "global",
                items: [
                    {
                        id: "new-project",
                        children: "Add New Project",
                        icon: "PlusCircleIcon",
                        closeOnSelect: true,
                        onClick: () => {
                            console.log("Click")
                        },
                    },
                    {
                        id: "invite-user",
                        children: "Invite User to Infisical",
                        icon: "UserCircleIcon",
                        closeOnSelect: true,
                        onClick: () => {
                            console.log("Click")
                        },
                    },
                ],
            },
        ],
        search
    );

    useEffect(() => {
        function handleKeyDown(e: KeyboardEvent) {
            if (e.metaKey && e.key === "k") {
                e.preventDefault();
                e.stopPropagation();

                setOpen((currentValue) => {
                    return !currentValue;
                });
            }
        }

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    return (
        <CommandPalette
            onChangeSearch={setSearch}
            onChangeOpen={setOpen}
            search={search}
            isOpen={open}
            page={page}
        >
            <CommandPalette.Page id="root">
                {filteredItems.length ? (
                    filteredItems.map((list) => (
                        <CommandPalette.List key={list.id} heading={list.heading}>
                            {list.items.map(({ id, ...rest }) => (
                                <CommandPalette.ListItem
                                    key={id}
                                    index={getItemIndex(filteredItems, id)}
                                    {...rest}
                                />
                            ))}
                        </CommandPalette.List>
                    ))
                ) : (
                    <CommandPalette.FreeSearchAction />
                )}
            </CommandPalette.Page>

            <CommandPalette.Page id="projects">
                {/* Projects page */}
            </CommandPalette.Page>
        </CommandPalette>
    );
};

export default CommandMenu;