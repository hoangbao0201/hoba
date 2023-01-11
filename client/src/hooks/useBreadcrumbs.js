const listTitleChange = {
    login: "Đăng nhập",
    register: "Đăng kí",
};
const listTitleSkip = ["auth"];

const useBreadcrumbs = (router) => {
    const asPathWithoutQuery = router.asPath.split("?")[0];

    const asPathNestedRoutes = asPathWithoutQuery
        .split("/")
        .filter((v) => v.length > 0);

    let result = [{ href: "/", title: "Home" }];
    asPathNestedRoutes.filter((subpath, idx) => {
        const href = "/" + asPathNestedRoutes.slice(0, idx + 1).join("/");

        let title = subpath;
        if (listTitleChange[title]) {
            title = listTitleChange[title];
        }

        if (listTitleSkip.includes(title)) {
            return false;
        } else {
            result.push({ href: href, title: title });
            return true;
        }
    });

    return result;
};

export default useBreadcrumbs;
