const Footer = () => {
    return (
        <footer className="footer footer-horizontal footer-center bg-base-300 text-black dark:text-primary-content py-3">
            <div className="flex justify-between gap-6 w-full max-w-100 px-6">

                <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                    <div className="flex flex-col gap-2 items-start font-bold">
                        <span className="text-sm text-nowrap">Rakesh Kawale</span>
                        <span className="text-xs text-nowrap">Co-Founder & CEO</span>
                        <span className="text-xs">8999193614</span>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                    <div className="flex flex-col gap-2 items-start font-bold">
                        <span className="text-sm text-nowrap">Pranav Balpande</span>
                        <span className="text-xs text-nowrap">Co-Founder & CTO</span>
                        <span className="text-xs">9442903079</span>
                    </div>
                </div>
            </div>

            <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
        </footer>
    );
};

export default Footer;
