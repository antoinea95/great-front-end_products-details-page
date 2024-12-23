import {
    RiFacebookBoxLine,
    RiGithubLine,
    RiInstagramLine,
    RiTwitterXLine,
    RiYoutubeLine,
  } from "react-icons/ri";

export const FooterSocialSection = () => {

    return (
        <section className="space-y-8 sm:space-y-0 w-full pt-8 border-t sm:flex sm:items-center sm:gap-4 lg:justify-between">
        <small className=" text-neutral-500 text-center text-base sm:text-xl">© 2024 StyleNest, Inc. All rights reserved.</small>
        <div className="flex gap-6 items-center text-2xl">
          <a href="" className="text-neutral-500">
            <RiYoutubeLine strokeWidth={0.4} />
          </a>
          <a href="" className="text-neutral-500">
            <RiInstagramLine strokeWidth={0.4} />
          </a>
          <a href="" className="text-neutral-500">
            <RiFacebookBoxLine strokeWidth={0.4} />
          </a>
          <a href="" className="text-neutral-500">
            <RiGithubLine strokeWidth={0.4} />
          </a>
          <a href="" className="text-neutral-500">
            <RiTwitterXLine strokeWidth={0.4} />
          </a>
        </div>
      </section>
    )
}