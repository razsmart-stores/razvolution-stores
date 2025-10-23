Esta es la estructura de archivos y proyectos de muestra de Next.js-canary, por los nombres podrás inferir el caso de uso de cada uno de los aparatos y podras solucitar el snapshoot de parte de el para que analicemos la lógica recomendada, es un material que siempre nos servirá para hacer una suite estable y de elite y, siempre que encontremos algun punto de mejora lo realicezaremos, pero ya no estamosa ciegas tenemos base de apoyo real de consulta, pediras siempres solo la parte que nos interesa estudiar indicando la ruta cimpleta de la parte del proyectoa crear el snapshoot.

C:\Users\VAIO\apps\aaa-proyectos-propios\_\_\_vercel-plantillas-next.js-canary-container\next.js-canary\examples

# ÁRBOL DE ESTRUCTURA DEL PROYECTO

examples/
├── active-class-name/
│ ├── app/
│ │ ├── [slug]/
│ │ │ └── page.tsx
│ │ ├── about/
│ │ │ └── page.tsx
│ │ ├── news/
│ │ │ └── page.tsx
│ │ ├── layout.tsx
│ │ └── page.tsx
│ ├── components/
│ │ ├── ActiveLink.tsx
│ │ └── Nav.tsx
│ ├── .gitignore [IGNORADO]
│ ├── next.config.js
│ ├── package.json
│ ├── README.md
│ └── tsconfig.json
├── api-routes-apollo-server/
│ ├── pages/
│ │ ├── api/
│ │ │ └── graphql.ts
│ │ ├── [username].tsx
│ │ └── index.tsx
│ ├── shared/
│ │ └── query-graphql/
│ │ └── index.ts
│ ├── .gitignore [IGNORADO]
│ ├── package.json
│ ├── README.md
│ └── tsconfig.json
├── api-routes-apollo-server-and-client/
│ ├── apollo/
│ │ ├── client.tsx
│ │ ├── resolvers.ts
│ │ ├── schema.ts
│ │ └── type-defs.ts
│ ├── pages/
│ │ ├── api/
│ │ │ └── graphql.ts
│ │ ├── \_app.tsx
│ │ ├── about.tsx
│ │ └── index.tsx
│ ├── .gitignore [IGNORADO]
│ ├── package.json
│ ├── README.md
│ └── tsconfig.json
├── api-routes-apollo-server-and-client-auth/
│ ├── apollo/
│ │ ├── client.tsx
│ │ ├── resolvers.ts
│ │ ├── schema.ts
│ │ └── type-defs.ts
│ ├── components/
│ │ └── field.tsx
│ ├── lib/
│ │ ├── auth-cookies.ts
│ │ ├── auth.ts
│ │ ├── form.ts
│ │ └── user.ts
│ ├── pages/
│ │ ├── api/
│ │ │ └── graphql.ts
│ │ ├── \_app.tsx
│ │ ├── about.tsx
│ │ ├── index.tsx
│ │ ├── signin.tsx
│ │ ├── signout.tsx
│ │ └── signup.tsx
│ ├── .env [IGNORADO]
│ ├── .gitignore [IGNORADO]
│ ├── package.json
│ ├── README.md
│ └── tsconfig.json
├── api-routes-cors/
│ ├── pages/
│ │ ├── api/
│ │ │ └── cors.ts
│ │ └── index.tsx
│ ├── .gitignore [IGNORADO]
│ ├── package.json
│ ├── README.md
│ └── tsconfig.json
├── api-routes-graphql/
│ ├── pages/
│ │ ├── api/
│ │ │ └── graphql.ts
│ │ └── index.tsx
│ ├── .gitignore [IGNORADO]
│ ├── package.json
│ ├── README.md
│ └── tsconfig.json
├── api-routes-middleware/
│ ├── pages/
│ │ ├── api/
│ │ │ └── cookies.ts
│ │ └── index.tsx
│ ├── utils/
│ │ └── cookies.ts
│ ├── .gitignore [IGNORADO]
│ ├── package.json
│ ├── README.md
│ └── tsconfig.json
├── api-routes-rest/
│ ├── interfaces/
│ │ └── index.ts
│ ├── pages/
│ │ ├── api/
│ │ │ ├── user/
│ │ │ │ └── [id].ts
│ │ │ └── users.ts
│ │ ├── user/
│ │ │ └── [id].tsx
│ │ └── index.tsx
│ ├── .gitignore [IGNORADO]
│ ├── package.json
│ ├── README.md
│ └── tsconfig.json
├── auth/
│ ├── app/
│ │ ├── api/
│ │ │ └── auth/
│ │ │ └── [...nextauth]/
│ │ │ └── route.ts
│ │ ├── favicon.ico
│ │ ├── globals.css
│ │ ├── layout.tsx
│ │ └── page.tsx
│ ├── .env.example
│ ├── .gitignore [IGNORADO]
│ ├── auth.ts
│ ├── middleware.ts
│ ├── package.json
│ ├── README.md
│ └── tsconfig.json
├── auth-with-stytch/
│ ├── .gitignore [IGNORADO]
│ └── readme.md
├── auth0/
│ ├── components/
│ │ ├── header.tsx
│ │ └── layout.tsx
│ ├── interfaces/
│ │ └── index.ts
│ ├── pages/
│ │ ├── advanced/
│ │ │ ├── api-profile.tsx
│ │ │ └── ssr-profile.tsx
│ │ ├── api/
│ │ │ ├── auth/
│ │ │ │ └── [...auth0].tsx
│ │ │ └── protected-api.ts
│ │ ├── \_app.tsx
│ │ ├── about.tsx
│ │ ├── index.tsx
│ │ └── profile.tsx
│ ├── .env.local.example
│ ├── .gitignore [IGNORADO]
│ ├── additional.d.ts
│ ├── package.json
│ ├── README.md
│ └── tsconfig.json
├── basic-css/
│ ├── app/
│ │ ├── layout.tsx
│ │ └── page.tsx
│ ├── .gitignore [IGNORADO]
│ ├── package.json
│ ├── README.md
│ ├── styles.module.css
│ └── tsconfig.json
├── blog/
│ ├── pages/
│ │ ├── posts/
│ │ │ ├── index.md
│ │ │ ├── markdown.md
│ │ │ └── pages.md
│ │ ├── tags/
│ │ │ └── [tag].mdx
│ │ ├── \_app.tsx
│ │ ├── \_document.tsx
│ │ ├── index.mdx
│ │ └── photos.mdx
│ ├── public/ [IGNORADO]
│ ├── scripts/
│ │ └── gen-rss.js
│ ├── styles/
│ │ └── main.css
│ ├── .gitignore [IGNORADO]
│ ├── next.config.js
│ ├── package.json
│ ├── README.md
│ ├── theme.config.js
│ └── tsconfig.json
├── blog-starter/
│ ├── \_posts/
│ │ ├── dynamic-routing.md
│ │ ├── hello-world.md
│ │ └── preview.md
│ ├── public/ [IGNORADO]
│ ├── src/
│ │ ├── app/
│ │ │ ├── \_components/
│ │ │ │ ├── alert.tsx
│ │ │ │ ├── avatar.tsx
│ │ │ │ ├── container.tsx
│ │ │ │ ├── cover-image.tsx
│ │ │ │ ├── date-formatter.tsx
│ │ │ │ ├── footer.tsx
│ │ │ │ ├── header.tsx
│ │ │ │ ├── hero-post.tsx
│ │ │ │ ├── intro.tsx
│ │ │ │ ├── markdown-styles.module.css
│ │ │ │ ├── more-stories.tsx
│ │ │ │ ├── post-body.tsx
│ │ │ │ ├── post-header.tsx
│ │ │ │ ├── post-preview.tsx
│ │ │ │ ├── post-title.tsx
│ │ │ │ ├── section-separator.tsx
│ │ │ │ ├── switch.module.css
│ │ │ │ └── theme-switcher.tsx
│ │ │ ├── posts/
│ │ │ │ └── [slug]/
│ │ │ │ └── page.tsx
│ │ │ ├── globals.css
│ │ │ ├── layout.tsx
│ │ │ └── page.tsx
│ │ ├── interfaces/
│ │ │ ├── author.ts
│ │ │ └── post.ts
│ │ └── lib/
│ │ ├── api.ts
│ │ ├── constants.ts
│ │ └── markdownToHtml.ts
│ ├── .gitignore [IGNORADO]
│ ├── package.json
│ ├── postcss.config.js
│ ├── README.md
│ ├── tailwind.config.ts
│ └── tsconfig.json
├── blog-with-comment/
│ ├── \_posts/
│ │ ├── long-expected-party.md
│ │ ├── passing-of-grey-company.md
│ │ ├── prancing-pony.md
│ │ └── riders-of-rohan.md
│ ├── components/
│ │ ├── comment/
│ │ │ ├── form.tsx
│ │ │ ├── index.tsx
│ │ │ └── list.tsx
│ │ ├── container.tsx
│ │ └── header.tsx
│ ├── hooks/
│ │ └── useComment.ts
│ ├── interfaces/
│ │ └── index.ts
│ ├── lib/
│ │ ├── clearUrl.ts
│ │ ├── createComment.ts
│ │ ├── dateRelative.ts
│ │ ├── deleteComment.ts
│ │ ├── fetchComment.ts
│ │ ├── getPost.ts
│ │ ├── getUser.ts
│ │ ├── markdownToHtml.ts
│ │ └── redis.ts
│ ├── pages/
│ │ ├── api/
│ │ │ └── comment.ts
│ │ ├── posts/
│ │ │ ├── [slug].tsx
│ │ │ └── index.tsx
│ │ ├── \_app.tsx
│ │ ├── \_document.tsx
│ │ └── index.tsx
│ ├── public/ [IGNORADO]
│ ├── .env.local.example
│ ├── .gitignore [IGNORADO]
│ ├── environment.d.ts
│ ├── package.json
│ ├── postcss.config.js
│ ├── README.md
│ ├── tailwind.config.js
│ └── tsconfig.json
├── cache-handler-redis/
│ ├── app/
│ │ ├── [timezone]/
│ │ │ └── page.tsx
│ │ ├── cache-state-watcher.tsx
│ │ ├── global.css
│ │ ├── layout.tsx
│ │ ├── revalidate-from.tsx
│ │ └── server-actions.ts
│ ├── public/ [IGNORADO]
│ ├── .gitignore [IGNORADO]
│ ├── cache-handler.js
│ ├── compose.yaml
│ ├── next.config.js
│ ├── package.json
│ ├── README.md
│ └── tsconfig.json
├── cloudflare-turnstile/
│ ├── pages/
│ │ ├── api/
│ │ │ └── handler.ts
│ │ ├── \_app.tsx
│ │ ├── explicit.tsx
│ │ └── implicit.tsx
│ ├── .env.local.example
│ ├── .gitignore [IGNORADO]
│ ├── app.css
│ ├── next.config.js
│ ├── package.json
│ ├── README.md
│ └── tsconfig.json
├── cms-agilitycms/
│ ├── components/
│ │ ├── alert.tsx
│ │ ├── avatar.tsx
│ │ ├── container.tsx
│ │ ├── cover-image.tsx
│ │ ├── date.tsx
│ │ ├── footer.tsx
│ │ ├── header.tsx
│ │ ├── hero-post.tsx
│ │ ├── intro.tsx
│ │ ├── layout.tsx
│ │ ├── markdown-styles.module.css
│ │ ├── meta.tsx
│ │ ├── more-stories.tsx
│ │ ├── post-body.tsx
│ │ ├── post-details.tsx
│ │ ├── post-header.tsx
│ │ ├── post-preview.tsx
│ │ ├── post-title.tsx
│ │ └── section-separator.tsx
│ ├── lib/
│ │ ├── components/
│ │ │ ├── content-zone.tsx
│ │ │ ├── image.tsx
│ │ │ ├── one-column-template.tsx
│ │ │ ├── page-template.tsx
│ │ │ └── rich-text-area.tsx
│ │ ├── api.ts
│ │ ├── constants.ts
│ │ ├── dependancies.ts
│ │ ├── normalize.ts
│ │ ├── preview.ts
│ │ ├── use-preview-redirect.ts
│ │ └── utils.ts
│ ├── pages/
│ │ ├── api/
│ │ │ ├── exit-preview.ts
│ │ │ └── preview.ts
│ │ ├── \_app.tsx
│ │ ├── \_document.tsx
│ │ ├── [...slug].tsx
│ │ └── index.ts
│ ├── public/ [IGNORADO]
│ ├── styles/
│ │ └── index.css
│ ├── .env.local.example
│ ├── .gitignore [IGNORADO]
│ ├── environment.d.ts
│ ├── package.json
│ ├── postcss.config.js
│ ├── README.md
│ ├── tailwind.config.js
│ └── tsconfig.json
├── cms-builder-io/
│ ├── builder/
│ │ ├── author/
│ │ │ ├── joe-public.json
│ │ │ ├── johnny-doe.json
│ │ │ └── schema.model.json
│ │ ├── post/
│ │ │ ├── first-one.json
│ │ │ ├── schema.model.json
│ │ │ └── second.json
│ │ └── settings.json
│ ├── components/
│ │ ├── alert.js
│ │ ├── avatar.js
│ │ ├── builder-image.js
│ │ ├── container.js
│ │ ├── cover-image.js
│ │ ├── date.js
│ │ ├── footer.js
│ │ ├── header.js
│ │ ├── hero-post.js
│ │ ├── intro.js
│ │ ├── layout.js
│ │ ├── meta.js
│ │ ├── more-stories.js
│ │ ├── post-body.js
│ │ ├── post-header.js
│ │ ├── post-preview.js
│ │ ├── post-title.js
│ │ └── section-separator.js
│ ├── lib/
│ │ ├── api.js
│ │ └── constants.js
│ ├── pages/
│ │ ├── api/
│ │ │ ├── exit-preview.js
│ │ │ └── preview.js
│ │ ├── posts/
│ │ │ └── [slug].js
│ │ ├── \_app.js
│ │ └── index.js
│ ├── public/ [IGNORADO]
│ ├── styles/
│ │ └── index.css
│ ├── .env.local.example
│ ├── .gitignore [IGNORADO]
│ ├── jsconfig.json
│ ├── next.config.js
│ ├── package.json
│ ├── postcss.config.js
│ ├── README.md
│ └── tailwind.config.js
├── cms-buttercms/
│ ├── components/
│ │ ├── blog/
│ │ │ ├── blog.js
│ │ │ ├── categories-widget.js
│ │ │ ├── post-preview-condensed.js
│ │ │ ├── post-preview.js
│ │ │ ├── posts-list.js
│ │ │ └── search-widget.js
│ │ ├── landing-page-sections/
│ │ │ ├── feature.js
│ │ │ ├── features.js
│ │ │ ├── hero.js
│ │ │ ├── landing-page-section.js
│ │ │ ├── missing-section.js
│ │ │ ├── testimonial.js
│ │ │ ├── testimonials.js
│ │ │ └── two-column-with-image.js
│ │ ├── main-menu/
│ │ │ ├── main-menu-link.js
│ │ │ └── main-menu.js
│ │ ├── author-card.js
│ │ ├── footer-section.js
│ │ ├── header-section.js
│ │ ├── human-date.js
│ │ ├── missing-token-section.js
│ │ ├── preloader.js
│ │ └── scroll-to-top-button.js
│ ├── css/
│ │ ├── fonts/
│ │ │ ├── LineIcons.eot
│ │ │ ├── LineIcons.svg
│ │ │ ├── LineIcons.ttf
│ │ │ ├── LineIcons.woff
│ │ │ └── LineIcons.woff2
│ │ ├── lineicons.css
│ │ ├── main.css
│ │ └── tiny-slider.min.css
│ ├── lib/
│ │ └── api.js
│ ├── pages/
│ │ ├── blog/
│ │ │ ├── category/
│ │ │ │ └── [slug].js
│ │ │ ├── tag/
│ │ │ │ └── [slug].js
│ │ │ ├── [slug].js
│ │ │ └── search.js
│ │ ├── landing-page/
│ │ │ └── [slug].js
│ │ ├── \_app.js
│ │ ├── \_document.js
│ │ ├── blog.js
│ │ └── missing-token.js
│ ├── public/ [IGNORADO]
│ ├── .env.local.example
│ ├── .gitignore [IGNORADO]
│ ├── app.json
│ ├── jsconfig.json
│ ├── next.config.js
│ ├── package.json
│ └── README.md
├── cms-contentful/
│ ├── app/
│ │ ├── api/
│ │ │ ├── disable-draft/
│ │ │ │ └── route.ts
│ │ │ ├── draft/
│ │ │ │ └── route.ts
│ │ │ └── revalidate/
│ │ │ └── route.ts
│ │ ├── posts/
│ │ │ └── [slug]/
│ │ │ └── page.tsx
│ │ ├── avatar.tsx
│ │ ├── cover-image.tsx
│ │ ├── date.tsx
│ │ ├── favicon.ico
│ │ ├── globals.css
│ │ ├── layout.tsx
│ │ ├── more-stories.tsx
│ │ └── page.tsx
│ ├── lib/
│ │ ├── api.ts
│ │ ├── constants.ts
│ │ ├── contentful-image.tsx
│ │ ├── export.json
│ │ ├── markdown.tsx
│ │ └── setup.js
│ ├── .env.local.example
│ ├── .gitignore [IGNORADO]
│ ├── next.config.js
│ ├── package.json
│ ├── postcss.config.js
│ ├── README.md
│ ├── tailwind.config.ts
│ └── tsconfig.json
├── cms-cosmic/
│ ├── components/
│ │ ├── alert.tsx
│ │ ├── avatar.tsx
│ │ ├── container.tsx
│ │ ├── cover-image.tsx
│ │ ├── date.tsx
│ │ ├── footer.tsx
│ │ ├── header.tsx
│ │ ├── hero-post.tsx
│ │ ├── intro.tsx
│ │ ├── layout.tsx
│ │ ├── markdown-styles.module.css
│ │ ├── meta.tsx
│ │ ├── more-stories.tsx
│ │ ├── post-body.tsx
│ │ ├── post-header.tsx
│ │ ├── post-preview.tsx
│ │ ├── post-title.tsx
│ │ └── section-separator.tsx
│ ├── interfaces/
│ │ └── index.ts
│ ├── lib/
│ │ ├── api.tsx
│ │ ├── constants.ts
│ │ └── markdownToHtml.ts
│ ├── pages/
│ │ ├── api/
│ │ │ ├── exit-preview.ts
│ │ │ └── preview.ts
│ │ ├── posts/
│ │ │ └── [slug].tsx
│ │ ├── \_app.tsx
│ │ ├── \_document.tsx
│ │ └── index.tsx
│ ├── public/ [IGNORADO]
│ ├── styles/
│ │ └── index.css
│ ├── .env.local.example
│ ├── .gitignore [IGNORADO]
│ ├── jsconfig.json
│ ├── next.config.js
│ ├── package.json
│ ├── postcss.config.js
│ ├── README.md
│ ├── tailwind.config.js
│ └── tsconfig.json
├── cms-datocms/
│ ├── components/
│ │ ├── alert.js
│ │ ├── avatar.js
│ │ ├── container.js
│ │ ├── cover-image.js
│ │ ├── date.js
│ │ ├── footer.js
│ │ ├── header.js
│ │ ├── hero-post.js
│ │ ├── intro.js
│ │ ├── layout.js
│ │ ├── markdown-styles.module.css
│ │ ├── meta.js
│ │ ├── more-stories.js
│ │ ├── post-body.js
│ │ ├── post-header.js
│ │ ├── post-preview.js
│ │ ├── post-title.js
│ │ └── section-separator.js
│ ├── lib/
│ │ ├── api.js
│ │ ├── constants.js
│ │ └── markdownToHtml.js
│ ├── pages/
│ │ ├── api/
│ │ │ ├── exit-preview.js
│ │ │ └── preview.js
│ │ ├── posts/
│ │ │ └── [slug].js
│ │ ├── \_app.js
│ │ ├── \_document.js
│ │ └── index.js
│ ├── public/ [IGNORADO]
│ ├── styles/
│ │ └── index.css
│ ├── .env.local.example
│ ├── .gitignore [IGNORADO]
│ ├── jsconfig.json
│ ├── next.config.js
│ ├── package.json
│ ├── postcss.config.js
│ ├── README.md
│ └── tailwind.config.js
├── cms-dotcms/
│ ├── components/
│ │ ├── alert.tsx
│ │ ├── avatar.tsx
│ │ ├── blocks.tsx
│ │ ├── container.tsx
│ │ ├── content-blocks.tsx
│ │ ├── cover-image.tsx
│ │ ├── date.tsx
│ │ ├── dotcms-image.tsx
│ │ ├── footer.tsx
│ │ ├── header.tsx
│ │ ├── hero-post.tsx
│ │ ├── intro.tsx
│ │ ├── layout.tsx
│ │ ├── meta.tsx
│ │ ├── more-stories.tsx
│ │ ├── post-body.tsx
│ │ ├── post-header.tsx
│ │ ├── post-preview.tsx
│ │ ├── post-title.tsx
│ │ └── section-separator.tsx
│ ├── lib/
│ │ ├── api.ts
│ │ └── constants.ts
│ ├── pages/
│ │ ├── api/
│ │ │ ├── exit-preview.tsx
│ │ │ └── preview.tsx
│ │ ├── posts/
│ │ │ └── [slug].tsx
│ │ ├── \_app.tsx
│ │ └── index.tsx
│ ├── public/ [IGNORADO]
│ ├── styles/
│ │ └── index.css
│ ├── .env.local.example
│ ├── .gitignore [IGNORADO]
│ ├── next.config.js
│ ├── package.json
│ ├── postcss.config.js
│ ├── README.md
│ ├── tailwind.config.js
│ └── tsconfig.json
├── cms-drupal/
│ ├── components/
│ │ ├── alert.js
│ │ ├── avatar.js
│ │ ├── categories.js
│ │ ├── container.js
│ │ ├── cover-image.js
│ │ ├── date.js
│ │ ├── footer.js
│ │ ├── header.js
│ │ ├── hero-post.js
│ │ ├── intro.js
│ │ ├── layout.js
│ │ ├── meta.js
│ │ ├── more-stories.js
│ │ ├── post-body.js
│ │ ├── post-body.module.css
│ │ ├── post-header.js
│ │ ├── post-preview.js
│ │ ├── post-title.js
│ │ ├── section-separator.js
│ │ └── tags.js
│ ├── lib/
│ │ ├── api.js
│ │ └── constants.js
│ ├── pages/
│ │ ├── api/
│ │ │ ├── exit-preview.js
│ │ │ └── preview.js
│ │ ├── \_app.js
│ │ ├── \_document.js
│ │ ├── [...slug].js
│ │ └── index.js
│ ├── public/ [IGNORADO]
│ ├── styles/
│ │ └── index.css
│ ├── .env.local.example
│ ├── .gitignore [IGNORADO]
│ ├── package.json
│ ├── postcss.config.js
│ ├── README.md
│ └── tailwind.config.js
├── cms-enterspeed/
│ ├── components/
│ │ ├── alert.tsx
│ │ ├── avatar.tsx
│ │ ├── categories.tsx
│ │ ├── container.tsx
│ │ ├── cover-image.tsx
│ │ ├── date.tsx
│ │ ├── footer.tsx
│ │ ├── header.tsx
│ │ ├── hero-post.tsx
│ │ ├── intro.tsx
│ │ ├── layout.tsx
│ │ ├── meta.tsx
│ │ ├── more-stories.tsx
│ │ ├── post-body.module.css
│ │ ├── post-body.tsx
│ │ ├── post-header.tsx
│ │ ├── post-preview.tsx
│ │ ├── post-title.tsx
│ │ ├── section-separator.tsx
│ │ └── tags.tsx
│ ├── lib/
│ │ ├── api.ts
│ │ └── constants.ts
│ ├── pages/
│ │ ├── api/
│ │ │ ├── exit-preview.js
│ │ │ └── preview.js
│ │ ├── posts/
│ │ │ └── [slug].tsx
│ │ ├── \_app.tsx
│ │ └── index.tsx
│ ├── public/ [IGNORADO]
│ ├── styles/
│ │ └── index.css
│ ├── types/
│ │ ├── authorType.ts
│ │ └── postType.ts
│ ├── .env.local.example
│ ├── .gitignore [IGNORADO]
│ ├── next.config.js
│ ├── package.json
│ ├── postcss.config.js
│ ├── README.md
│ ├── tailwind.config.js
│ └── tsconfig.json
├── cms-ghost/
│ ├── components/
│ │ ├── alert.js
│ │ ├── avatar.js
│ │ ├── container.js
│ │ ├── cover-image.js
│ │ ├── date.js
│ │ ├── footer.js
│ │ ├── header.js
│ │ ├── hero-post.js
│ │ ├── intro.js
│ │ ├── layout.js
│ │ ├── markdown-styles.module.css
│ │ ├── meta.js
│ │ ├── more-stories.js
│ │ ├── post-body.js
│ │ ├── post-header.js
│ │ ├── post-preview.js
│ │ ├── post-title.js
│ │ └── section-separator.js
│ ├── lib/
│ │ ├── api.js
│ │ ├── constants.js
│ │ └── defaults.js
│ ├── pages/
│ │ ├── api/
│ │ │ ├── exit-preview.js
│ │ │ └── preview.js
│ │ ├── posts/
│ │ │ └── [slug].js
│ │ ├── \_app.js
│ │ ├── \_document.js
│ │ └── index.js
│ ├── public/ [IGNORADO]
│ ├── styles/
│ │ └── index.css
│ ├── .env.local.example
│ ├── .gitignore [IGNORADO]
│ ├── jsconfig.json
│ ├── next.config.js
│ ├── package.json
│ ├── postcss.config.js
│ ├── README.md
│ └── tailwind.config.js
├── cms-graphcms/
│ ├── components/
│ │ ├── alert.js
│ │ ├── avatar.js
│ │ ├── container.js
│ │ ├── cover-image.js
│ │ ├── date.js
│ │ ├── footer.js
│ │ ├── header.js
│ │ ├── hero-post.js
│ │ ├── intro.js
│ │ ├── layout.js
│ │ ├── meta.js
│ │ ├── more-stories.js
│ │ ├── post-body.js
│ │ ├── post-header.js
│ │ ├── post-preview.js
│ │ ├── post-styles.module.css
│ │ ├── post-title.js
│ │ └── section-separator.js
│ ├── lib/
│ │ ├── constants.js
│ │ └── graphcms.js
│ ├── pages/
│ │ ├── api/
│ │ │ ├── exit-preview.js
│ │ │ └── preview.js
│ │ ├── posts/
│ │ │ └── [slug].js
│ │ ├── \_app.js
│ │ ├── \_document.js
│ │ └── index.js
│ ├── public/ [IGNORADO]
│ ├── styles/
│ │ └── index.css
│ ├── .env.local.example
│ ├── .gitignore [IGNORADO]
│ ├── jsconfig.json
│ ├── next.config.js
│ ├── package.json
│ ├── postcss.config.js
│ ├── README.md
│ └── tailwind.config.js
├── cms-keystonejs-embedded/
│ ├── .gitignore [IGNORADO]
│ └── README.md
├── cms-kontent-ai/
│ ├── components/
│ │ ├── alert.tsx
│ │ ├── avatar.tsx
│ │ ├── container.tsx
│ │ ├── cover-image.tsx
│ │ ├── date-formatter.tsx
│ │ ├── footer.tsx
│ │ ├── header.tsx
│ │ ├── hero-post.tsx
│ │ ├── image.tsx
│ │ ├── intro.tsx
│ │ ├── layout.tsx
│ │ ├── markdown-styles.module.css
│ │ ├── meta.tsx
│ │ ├── more-stories.tsx
│ │ ├── post-body.tsx
│ │ ├── post-header.tsx
│ │ ├── post-preview.tsx
│ │ ├── post-title.tsx
│ │ └── section-separator.tsx
│ ├── docs/ [IGNORADO]
│ ├── lib/
│ │ ├── api.ts
│ │ ├── constants.ts
│ │ └── markdownToHtml.ts
│ ├── models/
│ │ ├── content-type-snippets/
│ │ │ └── index.ts
│ │ ├── content-types/
│ │ │ ├── author.ts
│ │ │ ├── index.ts
│ │ │ └── post.ts
│ │ ├── project/
│ │ │ ├── assetFolders.ts
│ │ │ ├── collections.ts
│ │ │ ├── contentTypes.ts
│ │ │ ├── contentTypeSnippets.ts
│ │ │ ├── index.ts
│ │ │ ├── languages.ts
│ │ │ ├── roles.ts
│ │ │ ├── taxonomies.ts
│ │ │ ├── webhooks.ts
│ │ │ └── workflows.ts
│ │ ├── taxonomies/
│ │ │ └── index.ts
│ │ └── index.ts
│ ├── pages/
│ │ ├── api/
│ │ │ ├── exit-preview.ts
│ │ │ └── preview.ts
│ │ ├── posts/
│ │ │ └── [slug].tsx
│ │ ├── \_app.tsx
│ │ ├── \_document.tsx
│ │ └── index.tsx
│ ├── public/ [IGNORADO]
│ ├── styles/
│ │ └── index.css
│ ├── viewmodels/
│ │ ├── author.ts
│ │ └── post.ts
│ ├── .env.local.example
│ ├── .gitignore [IGNORADO]
│ ├── kontent-ai-backup.zip
│ ├── package.json
│ ├── postcss.config.js
│ ├── README.md
│ ├── tailwind.config.js
│ └── tsconfig.json
├── cms-makeswift/
│ ├── lib/
│ │ └── makeswift/
│ │ └── register-components.tsx
│ ├── pages/
│ │ ├── api/
│ │ │ └── makeswift/
│ │ │ └── [...makeswift].ts
│ │ ├── \_document.ts
│ │ └── [[...path]].tsx
│ ├── .env.local.example
│ ├── .gitignore [IGNORADO]
│ ├── next.config.js
│ ├── package.json
│ ├── README.md
│ └── tsconfig.json
├── cms-payload/
│ ├── app/
│ │ ├── (payload)/
│ │ │ └── admin/
│ │ │ ├── [...slug]/
│ │ │ │ └── page.tsx
│ │ │ └── page.tsx
│ │ ├── (site)/
│ │ │ ├── [slug]/
│ │ │ │ └── page.tsx
│ │ │ ├── layout.tsx
│ │ │ └── page.tsx
│ │ └── layout.tsx
│ ├── components/
│ │ ├── AdminBar/
│ │ │ ├── index.module.scss
│ │ │ └── index.tsx
│ │ ├── BackgroundColor/
│ │ │ ├── index.module.scss
│ │ │ └── index.tsx
│ │ ├── Blocks/
│ │ │ ├── CallToAction/
│ │ │ │ ├── index.module.scss
│ │ │ │ └── index.tsx
│ │ │ ├── Content/
│ │ │ │ ├── index.module.scss
│ │ │ │ └── index.tsx
│ │ │ ├── MediaBlock/
│ │ │ │ ├── index.module.scss
│ │ │ │ └── index.tsx
│ │ │ └── index.tsx
│ │ ├── Button/
│ │ │ ├── index.module.scss
│ │ │ └── index.tsx
│ │ ├── Gutter/
│ │ │ ├── index.module.scss
│ │ │ └── index.tsx
│ │ ├── Header/
│ │ │ ├── index.module.scss
│ │ │ ├── index.tsx
│ │ │ ├── mobileMenuModal.module.scss
│ │ │ └── MobileMenuModal.tsx
│ │ ├── Hero/
│ │ │ ├── HighImpact/
│ │ │ │ ├── index.module.scss
│ │ │ │ └── index.tsx
│ │ │ ├── LowImpact/
│ │ │ │ ├── index.module.scss
│ │ │ │ └── index.tsx
│ │ │ ├── MediumImpact/
│ │ │ │ ├── index.module.scss
│ │ │ │ └── index.tsx
│ │ │ └── index.tsx
│ │ ├── icons/ [IGNORADO]
│ │ ├── Label/
│ │ │ ├── index.module.scss
│ │ │ └── index.tsx
│ │ ├── LargeBody/
│ │ │ ├── index.module.scss
│ │ │ └── index.tsx
│ │ ├── Layout/
│ │ │ └── index.tsx
│ │ ├── Link/
│ │ │ └── index.tsx
│ │ ├── Logo/
│ │ │ └── index.tsx
│ │ ├── Media/
│ │ │ ├── Image/
│ │ │ │ ├── index.module.scss
│ │ │ │ └── index.tsx
│ │ │ ├── Video/
│ │ │ │ ├── index.module.scss
│ │ │ │ └── index.tsx
│ │ │ └── index.tsx
│ │ ├── RichText/
│ │ │ ├── index.module.scss
│ │ │ ├── index.tsx
│ │ │ └── serialize.tsx
│ │ └── VerticalPadding/
│ │ ├── index.module.scss
│ │ └── index.tsx
│ ├── css/
│ │ ├── app.scss
│ │ ├── colors.scss
│ │ ├── common.scss
│ │ ├── queries.scss
│ │ └── type.scss
│ ├── pages/
│ │ └── api/
│ │ ├── [collection]/
│ │ │ ├── access/
│ │ │ │ └── [id].ts
│ │ │ ├── [id].ts
│ │ │ ├── first-register.ts
│ │ │ ├── forgot-password.ts
│ │ │ ├── index.ts
│ │ │ ├── init.ts
│ │ │ ├── login.ts
│ │ │ ├── logout.ts
│ │ │ ├── me.ts
│ │ │ └── refresh.ts
│ │ ├── globals/
│ │ │ └── [global]/
│ │ │ ├── access.ts
│ │ │ └── index.ts
│ │ ├── access.ts
│ │ ├── graphql-playground.ts
│ │ ├── graphql.ts
│ │ └── regenerate.ts
│ ├── payload/
│ │ ├── access/
│ │ │ └── publishedOnly.ts
│ │ ├── blocks/
│ │ │ ├── CallToAction/
│ │ │ │ └── index.ts
│ │ │ ├── Content/
│ │ │ │ └── index.ts
│ │ │ └── Media/
│ │ │ └── index.ts
│ │ ├── collections/
│ │ │ ├── Media.ts
│ │ │ ├── Pages.ts
│ │ │ └── Users.ts
│ │ ├── fields/
│ │ │ ├── richText/
│ │ │ │ ├── label/
│ │ │ │ │ ├── Button/
│ │ │ │ │ │ └── index.tsx
│ │ │ │ │ ├── Element/
│ │ │ │ │ │ ├── index.scss
│ │ │ │ │ │ └── index.tsx
│ │ │ │ │ ├── Icon/
│ │ │ │ │ │ └── index.tsx
│ │ │ │ │ ├── index.ts
│ │ │ │ │ └── plugin.ts
│ │ │ │ ├── largeBody/
│ │ │ │ │ ├── Button/
│ │ │ │ │ │ └── index.tsx
│ │ │ │ │ ├── Element/
│ │ │ │ │ │ ├── index.scss
│ │ │ │ │ │ └── index.tsx
│ │ │ │ │ ├── Icon/
│ │ │ │ │ │ └── index.tsx
│ │ │ │ │ ├── index.ts
│ │ │ │ │ └── plugin.ts
│ │ │ │ ├── elements.ts
│ │ │ │ ├── index.ts
│ │ │ │ └── leaves.ts
│ │ │ ├── backgroundColor.ts
│ │ │ ├── hero.ts
│ │ │ ├── link.ts
│ │ │ ├── linkGroup.ts
│ │ │ └── slug.ts
│ │ ├── globals/
│ │ │ └── MainMenu.ts
│ │ ├── utilities/
│ │ │ ├── deepMerge.ts
│ │ │ ├── formatSlug.ts
│ │ │ └── regenerateStaticPage.ts
│ │ ├── payload.config.ts
│ │ └── payloadClient.ts
│ ├── public/ [IGNORADO]
│ ├── utilities/
│ │ ├── timestamp.ts
│ │ └── toKebabCase.ts
│ ├── .env.example
│ ├── .gitignore [IGNORADO]
│ ├── .npmrc
│ ├── cssVariables.js
│ ├── next-env.scss.d.ts
│ ├── next.config.js
│ ├── package.json
│ ├── payload-types.ts
│ ├── README.md
│ └── tsconfig.json
├── cms-plasmic/
│ ├── pages/
│ │ ├── api/
│ │ │ ├── exit-preview.ts
│ │ │ └── preview.ts
│ │ ├── \_app.js
│ │ └── [[...catchall]].tsx
│ ├── public/ [IGNORADO]
│ ├── styles/
│ │ └── globals.css
│ ├── .env.local.example
│ ├── .gitignore [IGNORADO]
│ ├── next.config.js
│ ├── package.json
│ ├── plasmic-init.ts
│ ├── README.md
│ └── tsconfig.json
├── cms-prepr/
│ ├── components/
│ │ ├── alert.js
│ │ ├── avatar.js
│ │ ├── container.js
│ │ ├── cover-image.js
│ │ ├── date.js
│ │ ├── footer.js
│ │ ├── header.js
│ │ ├── hero-post.js
│ │ ├── intro.js
│ │ ├── layout.js
│ │ ├── markdown-styles.module.css
│ │ ├── meta.js
│ │ ├── more-stories.js
│ │ ├── post-body.js
│ │ ├── post-header.js
│ │ ├── post-preview.js
│ │ ├── post-title.js
│ │ └── section-separator.js
│ ├── lib/
│ │ ├── api.js
│ │ └── constants.js
│ ├── pages/
│ │ ├── api/
│ │ │ ├── exit-preview.js
│ │ │ └── preview.js
│ │ ├── posts/
│ │ │ └── [slug].js
│ │ ├── \_app.js
│ │ ├── \_document.js
│ │ └── index.js
│ ├── public/ [IGNORADO]
│ ├── styles/
│ │ └── index.css
│ ├── .env.local.example
│ ├── .gitignore [IGNORADO]
│ ├── jsconfig.json
│ ├── next.config.js
│ ├── package.json
│ ├── postcss.config.js
│ ├── README.md
│ └── tailwind.config.js
├── cms-prismic/
│ ├── .slicemachine/
│ │ ├── assets/
│ │ │ ├── customtypes/
│ │ │ │ ├── author/
│ │ │ │ │ └── mocks.json
│ │ │ │ └── post/
│ │ │ │ └── mocks.json
│ │ │ └── slices/
│ │ │ ├── Image/
│ │ │ │ ├── default/
│ │ │ │ │ └── preview.png
│ │ │ │ ├── index.stories.js
│ │ │ │ └── mocks.json
│ │ │ └── Text/
│ │ │ ├── default/
│ │ │ │ └── preview.png
│ │ │ ├── index.stories.js
│ │ │ └── mocks.json
│ │ ├── libraries-state.json
│ │ └── mock-config.json
│ ├── components/
│ │ ├── alert.tsx
│ │ ├── avatar.tsx
│ │ ├── container.tsx
│ │ ├── cover-image.tsx
│ │ ├── date.tsx
│ │ ├── footer.tsx
│ │ ├── header.tsx
│ │ ├── hero-post.tsx
│ │ ├── intro.tsx
│ │ ├── layout.tsx
│ │ ├── meta.tsx
│ │ ├── more-stories.tsx
│ │ ├── post-body.tsx
│ │ ├── post-header.tsx
│ │ ├── post-preview.tsx
│ │ ├── post-title.tsx
│ │ └── section-separator.tsx
│ ├── customtypes/
│ │ ├── author/
│ │ │ └── index.json
│ │ └── post/
│ │ └── index.json
│ ├── documents/
│ │ └── .keep
│ ├── lib/
│ │ ├── constants.ts
│ │ ├── prismic.ts
│ │ └── types.ts
│ ├── pages/
│ │ ├── api/
│ │ │ ├── exit-preview.ts
│ │ │ └── preview.ts
│ │ ├── posts/
│ │ │ └── [slug].tsx
│ │ ├── \_app.tsx
│ │ ├── \_document.tsx
│ │ ├── index.tsx
│ │ └── slice-simulator.tsx
│ ├── public/ [IGNORADO]
│ ├── slices/
│ │ ├── Image/
│ │ │ ├── index.tsx
│ │ │ └── model.json
│ │ ├── Text/
│ │ │ ├── index.tsx
│ │ │ └── model.json
│ │ └── index.js
│ ├── styles/
│ │ └── index.css
│ ├── .gitignore [IGNORADO]
│ ├── next.config.js
│ ├── package.json
│ ├── postcss.config.js
│ ├── prismicCodegen.config.ts
│ ├── README.md
│ ├── sm.json
│ ├── tailwind.config.js
│ ├── tsconfig.json
│ └── types.generated.ts
├── cms-sanity/
│ ├── app/
│ │ ├── (blog)/
│ │ │ ├── posts/
│ │ │ │ └── [slug]/
│ │ │ │ └── page.tsx
│ │ │ ├── actions.ts
│ │ │ ├── alert-banner.tsx
│ │ │ ├── avatar.tsx
│ │ │ ├── cover-image.tsx
│ │ │ ├── date.tsx
│ │ │ ├── layout.tsx
│ │ │ ├── more-stories.tsx
│ │ │ ├── onboarding.tsx
│ │ │ ├── page.tsx
│ │ │ └── portable-text.tsx
│ │ ├── (sanity)/
│ │ │ ├── studio/
│ │ │ │ └── [[...tool]]/
│ │ │ │ └── page.tsx
│ │ │ ├── apple-icon.png
│ │ │ ├── icon.ico
│ │ │ ├── icon.png
│ │ │ ├── icon.svg
│ │ │ └── layout.tsx
│ │ ├── api/
│ │ │ └── draft-mode/
│ │ │ └── enable/
│ │ │ └── route.ts
│ │ ├── favicon.ico
│ │ └── globals.css
│ ├── sanity/
│ │ ├── lib/
│ │ │ ├── api.ts
│ │ │ ├── client.ts
│ │ │ ├── demo.ts
│ │ │ ├── fetch.ts
│ │ │ ├── queries.ts
│ │ │ ├── token.ts
│ │ │ └── utils.ts
│ │ ├── plugins/
│ │ │ ├── assist.ts
│ │ │ └── settings.tsx
│ │ └── schemas/
│ │ ├── documents/
│ │ │ ├── author.ts
│ │ │ └── post.ts
│ │ └── singletons/
│ │ └── settings.tsx
│ ├── .env.local.example
│ ├── .eslintignore
│ ├── .eslintrc
│ ├── .gitignore [IGNORADO]
│ ├── .prettierignore
│ ├── next.config.ts
│ ├── package.json
│ ├── postcss.config.js
│ ├── README.md
│ ├── sanity.cli.ts
│ ├── sanity.config.ts
│ ├── sanity.types.ts
│ ├── schema.json
│ ├── tailwind.config.ts
│ └── tsconfig.json
├── cms-sitecore-xmcloud/
│ ├── public/ [IGNORADO]
│ ├── scripts/
│ │ ├── config/
│ │ │ ├── plugins/
│ │ │ │ ├── computed.ts
│ │ │ │ ├── fallback.ts
│ │ │ │ ├── package-json.ts
│ │ │ │ └── scjssconfig.ts
│ │ │ └── index.ts
│ │ ├── temp/
│ │ │ ├── .npmignore
│ │ │ └── config-plugins.ts
│ │ ├── templates/
│ │ │ ├── component-factory.ts
│ │ │ └── component-src.ts
│ │ ├── bootstrap.ts
│ │ ├── fetch-graphql-introspection-data.ts
│ │ ├── generate-component-factory.ts
│ │ ├── generate-config.ts
│ │ ├── generate-plugins.ts
│ │ ├── scaffold-component.ts
│ │ └── utils.ts
│ ├── sitecore/
│ │ └── config/
│ │ └── xmcloud-nextjs-starter.config
│ ├── src/
│ │ ├── assets/
│ │ │ ├── basic/
│ │ │ │ ├── \_component.scss
│ │ │ │ ├── \_container.scss
│ │ │ │ ├── \_fonts.scss
│ │ │ │ ├── \_footer.scss
│ │ │ │ ├── \_header.scss
│ │ │ │ ├── \_navigation.scss
│ │ │ │ ├── \_promo.scss
│ │ │ │ ├── \_rich-text.scss
│ │ │ │ ├── \_variables.scss
│ │ │ │ └── main.scss
│ │ │ ├── sass/
│ │ │ │ ├── abstracts/
│ │ │ │ │ ├── vars/
│ │ │ │ │ │ ├── \_colors.scss
│ │ │ │ │ │ ├── \_fontSizes.scss
│ │ │ │ │ │ └── \_margins.scss
│ │ │ │ │ ├── \_functions.scss
│ │ │ │ │ ├── \_mixins.scss
│ │ │ │ │ └── \_vars.scss
│ │ │ │ ├── base/
│ │ │ │ │ ├── fonts/
│ │ │ │ │ │ ├── \_fonts.scss
│ │ │ │ │ │ └── index.scss
│ │ │ │ │ ├── links/
│ │ │ │ │ │ ├── \_link-button.scss
│ │ │ │ │ │ └── index.scss
│ │ │ │ │ ├── reset/
│ │ │ │ │ │ ├── \_inputs.scss
│ │ │ │ │ │ ├── \_links.scss
│ │ │ │ │ │ └── \_ui-datepicker.scss
│ │ │ │ │ ├── richtext/
│ │ │ │ │ │ ├── \_richtext-files-icons.scss
│ │ │ │ │ │ ├── \_richtext.scss
│ │ │ │ │ │ └── index.scss
│ │ │ │ │ ├── typehead/
│ │ │ │ │ │ ├── \_typehead.scss
│ │ │ │ │ │ └── index.scss
│ │ │ │ │ └── index.scss
│ │ │ │ ├── components/
│ │ │ │ │ ├── common/
│ │ │ │ │ │ ├── \_alignment.scss
│ │ │ │ │ │ ├── \_boxed.scss
│ │ │ │ │ │ ├── \_clearfix.scss
│ │ │ │ │ │ ├── \_highlighted.scss
│ │ │ │ │ │ ├── \_link-button.scss
│ │ │ │ │ │ ├── \_promoted-box.scss
│ │ │ │ │ │ └── index.scss
│ │ │ │ │ ├── container/
│ │ │ │ │ │ ├── \_bordered.scss
│ │ │ │ │ │ ├── \_title-row-box.scss
│ │ │ │ │ │ └── index.scss
│ │ │ │ │ ├── image/
│ │ │ │ │ │ ├── \_image-banner.scss
│ │ │ │ │ │ ├── \_image-default-size.scss
│ │ │ │ │ │ └── index.scss
│ │ │ │ │ ├── image-alignment/
│ │ │ │ │ │ ├── \_image-left.scss
│ │ │ │ │ │ └── \_image-right.scss
│ │ │ │ │ ├── layout/
│ │ │ │ │ │ ├── \_acaindent.scss
│ │ │ │ │ │ ├── \_background.scss
│ │ │ │ │ │ └── index.scss
│ │ │ │ │ ├── link-list/
│ │ │ │ │ │ ├── \_component-link-list.scss
│ │ │ │ │ │ ├── \_list-vertical.scss
│ │ │ │ │ │ └── index.scss
│ │ │ │ │ ├── navigation/
│ │ │ │ │ │ ├── \_navigation-fat.scss
│ │ │ │ │ │ ├── \_navigation-main-horizontal-vertical.scss
│ │ │ │ │ │ ├── \_navigation-mobile.scss
│ │ │ │ │ │ ├── \_navigation-sidebar.scss
│ │ │ │ │ │ ├── \_sitemap-navigation.scss
│ │ │ │ │ │ └── index.scss
│ │ │ │ │ ├── promo/
│ │ │ │ │ │ ├── \_absolute-bottom-link.scss
│ │ │ │ │ │ ├── \_promo-hero.scss
│ │ │ │ │ │ ├── \_promo-shadow.scss
│ │ │ │ │ │ └── index.scss
│ │ │ │ │ ├── rich-text/
│ │ │ │ │ │ ├── \_rich-text-lists.scss
│ │ │ │ │ │ └── index.scss
│ │ │ │ │ ├── spacing/
│ │ │ │ │ │ ├── \_background-colors.scss
│ │ │ │ │ │ ├── \_indent.scss
│ │ │ │ │ │ └── index.scss
│ │ │ │ │ ├── title/
│ │ │ │ │ │ ├── \_component-title.scss
│ │ │ │ │ │ └── index.scss
│ │ │ │ │ ├── \_component-column-splitter.scss
│ │ │ │ │ ├── \_component-container.scss
│ │ │ │ │ ├── \_component-image.scss
│ │ │ │ │ ├── \_component-navigation.scss
│ │ │ │ │ ├── \_component-promo.scss
│ │ │ │ │ ├── \_component-richtext-content.scss
│ │ │ │ │ └── index.scss
│ │ │ │ ├── variants/
│ │ │ │ │ ├── link-list/
│ │ │ │ │ │ └── index.scss
│ │ │ │ │ ├── navigation/
│ │ │ │ │ │ └── index.scss
│ │ │ │ │ ├── page-content/
│ │ │ │ │ │ └── index.scss
│ │ │ │ │ ├── promo/
│ │ │ │ │ │ └── index.scss
│ │ │ │ │ ├── rich-text/
│ │ │ │ │ │ └── index.scss
│ │ │ │ │ ├── title/
│ │ │ │ │ │ └── index.scss
│ │ │ │ │ └── index.scss
│ │ │ │ ├── \_app.scss
│ │ │ │ └── main.scss
│ │ │ ├── app.css
│ │ │ └── main.scss
│ │ ├── components/
│ │ │ ├── ColumnSplitter.tsx
│ │ │ ├── Container.tsx
│ │ │ ├── ContentBlock.tsx
│ │ │ ├── FEaaSWrapper.tsx
│ │ │ ├── Image.tsx
│ │ │ ├── LinkList.tsx
│ │ │ ├── Navigation.tsx
│ │ │ ├── PageContent.tsx
│ │ │ ├── PartialDesignDynamicPlaceholder.tsx
│ │ │ ├── Promo.tsx
│ │ │ ├── RichText.tsx
│ │ │ ├── RowSplitter.tsx
│ │ │ └── Title.tsx
│ │ ├── lib/
│ │ │ ├── component-props/
│ │ │ │ └── index.ts
│ │ │ ├── extract-path/
│ │ │ │ └── index.ts
│ │ │ ├── middleware/
│ │ │ │ └── index.ts
│ │ │ ├── next-config/
│ │ │ │ └── plugins/
│ │ │ │ ├── graphql.js
│ │ │ │ ├── robots.js
│ │ │ │ ├── sass.js
│ │ │ │ └── sitemap.js
│ │ │ ├── page-props-factory/
│ │ │ │ ├── plugins/
│ │ │ │ │ ├── component-props.ts
│ │ │ │ │ ├── normal-mode.ts
│ │ │ │ │ ├── preview-mode.ts
│ │ │ │ │ └── site.ts
│ │ │ │ └── index.ts
│ │ │ ├── site-resolver/
│ │ │ │ ├── plugins/
│ │ │ │ │ └── default.ts
│ │ │ │ └── index.ts
│ │ │ ├── sitemap-fetcher/
│ │ │ │ ├── plugins/
│ │ │ │ │ └── graphql-sitemap-service.ts
│ │ │ │ └── index.ts
│ │ │ ├── data-fetcher.ts
│ │ │ ├── dictionary-service-factory.ts
│ │ │ ├── layout-service-factory.ts
│ │ │ └── page-props.ts
│ │ ├── pages/
│ │ │ ├── api/
│ │ │ │ ├── editing/
│ │ │ │ │ ├── data/
│ │ │ │ │ │ └── [key].ts
│ │ │ │ │ └── render.ts
│ │ │ │ ├── healthz.ts
│ │ │ │ ├── robots.ts
│ │ │ │ └── sitemap.ts
│ │ │ ├── \_app.tsx
│ │ │ ├── \_error.tsx
│ │ │ ├── [[...path]].tsx
│ │ │ ├── 404.tsx
│ │ │ └── 500.tsx
│ │ ├── temp/
│ │ │ ├── .gitignore [IGNORADO]
│ │ │ └── GraphQLIntrospectionResult.json
│ │ ├── Layout.tsx
│ │ ├── middleware.ts
│ │ ├── Navigation.tsx
│ │ ├── NotFound.tsx
│ │ └── Scripts.tsx
│ ├── .env.example
│ ├── .gitignore [IGNORADO]
│ ├── .graphql-let.yml
│ ├── LICENSE.txt
│ ├── next.config.js
│ ├── package.json
│ ├── README.md
│ ├── tsconfig.json
│ └── tsconfig.scripts.json
├── cms-sitefinity/
│ ├── components/
│ │ ├── alert.tsx
│ │ ├── avatar.tsx
│ │ ├── container.tsx
│ │ ├── cover-image.tsx
│ │ ├── date-formatter.tsx
│ │ ├── footer.tsx
│ │ ├── header.tsx
│ │ ├── hero-post.tsx
│ │ ├── intro.tsx
│ │ ├── layout.tsx
│ │ ├── markdown-styles.module.css
│ │ ├── meta.tsx
│ │ ├── more-stories.tsx
│ │ ├── post-body.tsx
│ │ ├── post-header.tsx
│ │ ├── post-preview.tsx
│ │ ├── post-title.tsx
│ │ └── section-separator.tsx
│ ├── interfaces/
│ │ ├── author.ts
│ │ └── post.ts
│ ├── lib/
│ │ ├── api.ts
│ │ └── constants.ts
│ ├── pages/
│ │ ├── posts/
│ │ │ └── [...slug].tsx
│ │ ├── \_app.tsx
│ │ └── index.tsx
│ ├── public/ [IGNORADO]
│ ├── sitefinity/
│ │ └── SitefinityExport.zip
│ ├── styles/
│ │ └── index.css
│ ├── .env.local.example
│ ├── .gitignore [IGNORADO]
│ ├── package.json
│ ├── postcss.config.js
│ ├── README.md
│ ├── tailwind.config.js
│ └── tsconfig.json
├── cms-storyblok/
│ ├── components/
│ │ ├── alert.js
│ │ ├── avatar.js
│ │ ├── container.js
│ │ ├── cover-image.js
│ │ ├── date.js
│ │ ├── footer.js
│ │ ├── header.js
│ │ ├── hero-post.js
│ │ ├── intro.js
│ │ ├── layout.js
│ │ ├── markdown-styles.module.css
│ │ ├── meta.js
│ │ ├── more-stories.js
│ │ ├── post-body.js
│ │ ├── post-header.js
│ │ ├── post-preview.js
│ │ ├── post-title.js
│ │ └── section-separator.js
│ ├── lib/
│ │ ├── api.js
│ │ ├── constants.js
│ │ └── markdownToHtml.js
│ ├── pages/
│ │ ├── api/
│ │ │ ├── exit-preview.js
│ │ │ └── preview.js
│ │ ├── posts/
│ │ │ └── [slug].js
│ │ ├── \_app.js
│ │ ├── \_document.js
│ │ └── index.js
│ ├── public/ [IGNORADO]
│ ├── styles/
│ │ └── index.css
│ ├── .env.local.example
│ ├── .gitignore [IGNORADO]
│ ├── jsconfig.json
│ ├── package.json
│ ├── postcss.config.js
│ ├── README.md
│ └── tailwind.config.js
├── cms-strapi/
│ ├── .gitignore [IGNORADO]
│ └── README.md
├── cms-takeshape/
│ ├── components/
│ │ ├── alert.js
│ │ ├── avatar.js
│ │ ├── container.js
│ │ ├── cover-image.js
│ │ ├── date.js
│ │ ├── footer.js
│ │ ├── header.js
│ │ ├── hero-post.js
│ │ ├── intro.js
│ │ ├── layout.js
│ │ ├── markdown-styles.module.css
│ │ ├── meta.js
│ │ ├── more-stories.js
│ │ ├── post-body.js
│ │ ├── post-header.js
│ │ ├── post-preview.js
│ │ ├── post-title.js
│ │ └── section-separator.js
│ ├── lib/
│ │ ├── api.js
│ │ ├── constants.js
│ │ └── markdownToHtml.js
│ ├── pages/
│ │ ├── api/
│ │ │ ├── exit-preview.js
│ │ │ └── preview.js
│ │ ├── posts/
│ │ │ └── [slug].js
│ │ ├── \_app.js
│ │ ├── \_document.js
│ │ └── index.js
│ ├── public/ [IGNORADO]
│ ├── styles/
│ │ └── index.css
│ ├── .env.local.example
│ ├── .gitignore [IGNORADO]
│ ├── package.json
│ ├── postcss.config.js
│ ├── README.md
│ └── tailwind.config.js
├── cms-tina/
│ ├── \_posts/
│ │ ├── dynamic-routing.md
│ │ ├── hello-world.md
│ │ └── preview.md
│ ├── .tina/
│ │ ├── **generated**/
│ │ │ ├── \_graphql.json
│ │ │ ├── \_lookup.json
│ │ │ ├── \_schema.json
│ │ │ ├── .gitignore [IGNORADO]
│ │ │ ├── frags.gql
│ │ │ ├── queries.gql
│ │ │ ├── schema.gql
│ │ │ └── types.ts
│ │ ├── components/
│ │ │ ├── TinaDynamicProvider.js
│ │ │ └── TinaProvider.js
│ │ └── schema.ts
│ ├── components/
│ │ ├── alert.js
│ │ ├── avatar.js
│ │ ├── container.js
│ │ ├── cover-image.js
│ │ ├── date-formatter.js
│ │ ├── footer.js
│ │ ├── header.js
│ │ ├── hero-post.js
│ │ ├── intro.js
│ │ ├── layout.js
│ │ ├── markdown-styles.module.css
│ │ ├── meta.js
│ │ ├── more-stories.js
│ │ ├── post-body.js
│ │ ├── post-header.js
│ │ ├── post-preview.js
│ │ ├── post-title.js
│ │ └── section-separator.js
│ ├── lib/
│ │ ├── api.js
│ │ ├── constants.js
│ │ └── markdownToHtml.js
│ ├── pages/
│ │ ├── posts/
│ │ │ └── [slug].js
│ │ ├── \_app.js
│ │ ├── \_document.js
│ │ ├── admin.js
│ │ └── index.js
│ ├── public/ [IGNORADO]
│ ├── styles/
│ │ └── index.css
│ ├── .gitignore [IGNORADO]
│ ├── package.json
│ ├── postcss.config.js
│ ├── README.md
│ └── tailwind.config.js
├── cms-umbraco/
│ ├── components/
│ │ ├── alert.tsx
│ │ ├── avatar.tsx
│ │ ├── container.tsx
│ │ ├── cover-image.tsx
│ │ ├── date.tsx
│ │ ├── footer.tsx
│ │ ├── header.tsx
│ │ ├── hero-post.tsx
│ │ ├── intro.tsx
│ │ ├── layout.tsx
│ │ ├── meta.tsx
│ │ ├── more-stories.tsx
│ │ ├── post-body.module.css
│ │ ├── post-body.tsx
│ │ ├── post-header.tsx
│ │ ├── post-preview.tsx
│ │ ├── post-title.tsx
│ │ ├── section-separator.tsx
│ │ └── tags.tsx
│ ├── lib/
│ │ ├── api.ts
│ │ └── constants.ts
│ ├── pages/
│ │ ├── api/
│ │ │ ├── exit-preview.ts
│ │ │ └── preview.ts
│ │ ├── posts/
│ │ │ └── [slug].tsx
│ │ ├── \_app.tsx
│ │ └── index.tsx
│ ├── public/ [IGNORADO]
│ ├── styles/
│ │ └── index.css
│ ├── types/
│ │ ├── author.ts
│ │ ├── picture.ts
│ │ ├── post.ts
│ │ └── postAndMorePosts.ts
│ ├── .env.local.example
│ ├── .gitignore [IGNORADO]
│ ├── next.config.js
│ ├── package.json
│ ├── postcss.config.js
│ ├── README.md
│ ├── tailwind.config.js
│ └── tsconfig.json
├── cms-umbraco-heartcore/
│ ├── components/
│ │ ├── alert.js
│ │ ├── avatar.js
│ │ ├── container.js
│ │ ├── cover-image.js
│ │ ├── date.js
│ │ ├── footer.js
│ │ ├── header.js
│ │ ├── hero-post.js
│ │ ├── intro.js
│ │ ├── layout.js
│ │ ├── meta.js
│ │ ├── more-stories.js
│ │ ├── post-body.js
│ │ ├── post-header.js
│ │ ├── post-preview.js
│ │ ├── post-styles.module.css
│ │ ├── post-title.js
│ │ └── section-separator.js
│ ├── docs/ [IGNORADO]
│ ├── lib/
│ │ ├── constants.js
│ │ └── umbraco-heartcore.js
│ ├── pages/
│ │ ├── api/
│ │ │ ├── exit-preview.js
│ │ │ └── preview.js
│ │ ├── \_app.js
│ │ ├── \_document.js
│ │ ├── [...slug].js
│ │ └── index.js
│ ├── public/ [IGNORADO]
│ ├── styles/
│ │ └── index.css
│ ├── .env.local.example
│ ├── .gitignore [IGNORADO]
│ ├── jsconfig.json
│ ├── next.config.js
│ ├── package.json
│ ├── postcss.config.js
│ ├── README.md
│ └── tailwind.config.js
├── cms-webiny/
│ ├── components/
│ │ ├── alert.tsx
│ │ ├── avatar.tsx
│ │ ├── container.tsx
│ │ ├── cover-image.tsx
│ │ ├── date-formatter.tsx
│ │ ├── footer.tsx
│ │ ├── header.tsx
│ │ ├── hero-post.tsx
│ │ ├── intro.tsx
│ │ ├── layout.tsx
│ │ ├── markdown-styles.module.css
│ │ ├── meta.tsx
│ │ ├── more-stories.tsx
│ │ ├── post-body.tsx
│ │ ├── post-header.tsx
│ │ ├── post-preview.tsx
│ │ ├── post-title.tsx
│ │ └── section-separator.tsx
│ ├── lib/
│ │ ├── api.ts
│ │ ├── constants.ts
│ │ └── rich-text-renderer.tsx
│ ├── pages/
│ │ ├── api/
│ │ │ ├── exit-preview.ts
│ │ │ └── preview.ts
│ │ ├── posts/
│ │ │ └── [slug].tsx
│ │ ├── \_app.tsx
│ │ └── index.tsx
│ ├── public/ [IGNORADO]
│ ├── styles/
│ │ └── globals.css
│ ├── .env.local.example
│ ├── .gitignore [IGNORADO]
│ ├── next.config.js
│ ├── package.json
│ ├── postcss.config.js
│ ├── README.md
│ ├── tailwind.config.js
│ └── tsconfig.json
├── cms-wordpress/
│ ├── src/
│ │ ├── app/
│ │ │ ├── [[...slug]]/
│ │ │ │ └── page.tsx
│ │ │ ├── api/
│ │ │ │ ├── exit-preview/
│ │ │ │ │ └── route.ts
│ │ │ │ ├── preview/
│ │ │ │ │ └── route.ts
│ │ │ │ └── revalidate/
│ │ │ │ └── route.ts
│ │ │ ├── favicon.ico
│ │ │ ├── globals.css
│ │ │ ├── layout.tsx
│ │ │ ├── not-found.tsx
│ │ │ ├── robots.ts
│ │ │ └── sitemap.ts
│ │ ├── components/
│ │ │ ├── Globals/
│ │ │ │ ├── Navigation/
│ │ │ │ │ ├── Navigation.module.css
│ │ │ │ │ └── Navigation.tsx
│ │ │ │ └── PreviewNotice/
│ │ │ │ ├── PreviewNotice.module.css
│ │ │ │ └── PreviewNotice.tsx
│ │ │ └── Templates/
│ │ │ ├── Page/
│ │ │ │ ├── PageQuery.ts
│ │ │ │ └── PageTemplate.tsx
│ │ │ └── Post/
│ │ │ ├── PostQuery.ts
│ │ │ ├── PostTemplate.module.css
│ │ │ └── PostTemplate.tsx
│ │ ├── queries/
│ │ │ └── general/
│ │ │ ├── ContentInfoQuery.ts
│ │ │ └── SeoQuery.ts
│ │ ├── utils/
│ │ │ ├── fetchGraphQL.ts
│ │ │ ├── nextSlugToWpSlug.ts
│ │ │ └── seoData.ts
│ │ └── middleware.ts
│ ├── .env.local.example
│ ├── .gitignore [IGNORADO]
│ ├── add-ts-nocheck.js
│ ├── codegen.ts
│ ├── next.config.js
│ ├── package.json
│ ├── README.md
│ └── tsconfig.json
├── convex/
│ ├── convex/
│ │ ├── \_generated/
│ │ │ ├── api.d.ts
│ │ │ ├── api.js
│ │ │ ├── dataModel.d.ts
│ │ │ ├── server.d.ts
│ │ │ └── server.js
│ │ ├── messages.ts
│ │ ├── README.md
│ │ ├── schema.ts
│ │ └── tsconfig.json
│ ├── pages/
│ │ ├── \_app.tsx
│ │ └── index.tsx
│ ├── public/ [IGNORADO]
│ ├── styles/
│ │ └── globals.css
│ ├── .env [IGNORADO]
│ ├── .gitignore [IGNORADO]
│ ├── .prettierignore
│ ├── package.json
│ ├── README.md
│ └── tsconfig.json
├── custom-server/
│ ├── app/
│ │ ├── b/
│ │ │ └── page.tsx
│ │ └── layout.tsx
│ ├── pages/
│ │ ├── a.tsx
│ │ └── index.tsx
│ ├── .gitignore [IGNORADO]
│ ├── nodemon.json
│ ├── package.json
│ ├── README.md
│ ├── server.ts
│ ├── tsconfig.json
│ └── tsconfig.server.json
├── github-pages/
│ ├── app/
│ │ ├── about/
│ │ │ └── page.tsx
│ │ ├── layout.tsx
│ │ └── page.tsx
│ ├── .gitignore [IGNORADO]
│ ├── next.config.js
│ ├── package.json
│ ├── README.md
│ └── tsconfig.json
├── hello-world/
│ ├── app/
│ │ ├── layout.tsx
│ │ └── page.tsx
│ ├── .gitignore [IGNORADO]
│ ├── next.config.ts
│ ├── package.json
│ ├── README.md
│ └── tsconfig.json
├── i18n-routing/
│ ├── .vscode/ [IGNORADO]
│ ├── app/
│ │ └── [lang]/
│ │ ├── components/
│ │ │ ├── counter.tsx
│ │ │ └── locale-switcher.tsx
│ │ ├── layout.tsx
│ │ └── page.tsx
│ ├── dictionaries/
│ │ ├── cs.json
│ │ ├── de.json
│ │ └── en.json
│ ├── public/ [IGNORADO]
│ ├── .gitignore [IGNORADO]
│ ├── get-dictionary.ts
│ ├── i18n-config.ts
│ ├── middleware.ts
│ ├── package.json
│ ├── README.md
│ └── tsconfig.json
├── i18n-routing-pages/
│ ├── components/
│ │ └── locale-switcher.tsx
│ ├── pages/
│ │ ├── gsp/
│ │ │ ├── [slug].tsx
│ │ │ └── index.tsx
│ │ ├── gssp.tsx
│ │ └── index.tsx
│ ├── .gitignore [IGNORADO]
│ ├── next.config.js
│ ├── package.json
│ ├── README.md
│ └── tsconfig.json
├── image-component/
│ ├── app/
│ │ ├── background/
│ │ │ └── page.tsx
│ │ ├── color/
│ │ │ └── page.tsx
│ │ ├── fill/
│ │ │ └── page.tsx
│ │ ├── placeholder/
│ │ │ └── page.tsx
│ │ ├── responsive/
│ │ │ └── page.tsx
│ │ ├── shimmer/
│ │ │ └── page.tsx
│ │ ├── theme/
│ │ │ └── page.tsx
│ │ ├── layout.tsx
│ │ └── page.tsx
│ ├── components/
│ │ ├── view-source.module.css
│ │ └── view-source.tsx
│ ├── public/ [IGNORADO]
│ ├── .gitignore [IGNORADO]
│ ├── app.css
│ ├── next.config.js
│ ├── package.json
│ ├── README.md
│ ├── styles.module.css
│ └── tsconfig.json
├── image-secure-compute/
│ ├── app/
│ │ ├── image-api/
│ │ │ └── [...path]/
│ │ │ └── route.ts
│ │ ├── favicon.ico
│ │ ├── globals.css
│ │ ├── layout.tsx
│ │ ├── page.module.css
│ │ └── page.tsx
│ ├── components/
│ │ └── secure-image.tsx
│ ├── .gitignore [IGNORADO]
│ ├── next.config.ts
│ ├── package.json
│ ├── README.md
│ └── tsconfig.json
├── inngest/
│ ├── src/
│ │ ├── app/
│ │ │ ├── api/
│ │ │ │ └── inngest/
│ │ │ │ └── route.ts
│ │ │ ├── layout.tsx
│ │ │ └── page.tsx
│ │ └── inngest/
│ │ └── inngest.config.ts
│ ├── .env.development
│ ├── .gitignore [IGNORADO]
│ ├── next.config.js
│ ├── package.json
│ ├── README.md
│ └── tsconfig.json
├── markdoc/
│ ├── markdoc/
│ │ ├── functions.ts
│ │ ├── nodes.ts
│ │ └── tags.ts
│ ├── pages/
│ │ ├── \_app.tsx
│ │ └── index.md
│ ├── public/ [IGNORADO]
│ ├── .gitignore [IGNORADO]
│ ├── next.config.js
│ ├── package.json
│ ├── README.md
│ └── tsconfig.json
├── mdx/
│ ├── app/
│ │ ├── blog/
│ │ │ └── hello-world/
│ │ │ └── page.mdx
│ │ ├── globals.css
│ │ ├── layout.tsx
│ │ ├── message.mdx
│ │ ├── page.module.css
│ │ └── page.tsx
│ ├── public/ [IGNORADO]
│ ├── types/
│ │ └── mdx.d.ts
│ ├── .gitignore [IGNORADO]
│ ├── mdx-components.tsx
│ ├── next.config.js
│ ├── package.json
│ ├── README.md
│ └── tsconfig.json
├── mdx-pages/
│ ├── components/
│ │ └── button.js
│ ├── pages/
│ │ └── index.mdx
│ ├── .gitignore [IGNORADO]
│ ├── next.config.js
│ ├── package.json
│ └── README.md
├── mdx-remote/
│ ├── app/
│ │ ├── [slug]/
│ │ │ ├── page.module.css
│ │ │ └── page.tsx
│ │ ├── posts/
│ │ │ ├── example-post.mdx
│ │ │ └── hello-world.mdx
│ │ ├── globals.css
│ │ ├── layout.tsx
│ │ └── page.tsx
│ ├── components/
│ │ ├── greet.module.css
│ │ ├── greet.tsx
│ │ ├── mdx.module.css
│ │ └── mdx.tsx
│ ├── lib/
│ │ └── utils.ts
│ ├── .gitignore [IGNORADO]
│ ├── package.json
│ ├── README.md
│ └── tsconfig.json
├── next-forms/
│ ├── app/
│ │ ├── actions.ts
│ │ ├── add-form.tsx
│ │ ├── delete-form.tsx
│ │ ├── favicon.ico
│ │ ├── global.css
│ │ ├── layout.tsx
│ │ └── page.tsx
│ ├── .env.example
│ ├── .gitignore [IGNORADO]
│ ├── package.json
│ ├── README.md
│ └── tsconfig.json
├── panda-css/
│ ├── app/
│ │ ├── components/
│ │ │ ├── link-with-atomic-recipe.tsx
│ │ │ ├── link-with-atomic-style.tsx
│ │ │ ├── link-with-config-recipe.tsx
│ │ │ └── link-with-text-styles.tsx
│ │ ├── global.css
│ │ ├── layout.tsx
│ │ └── page.tsx
│ ├── .gitignore [IGNORADO]
│ ├── next.config.js
│ ├── package.json
│ ├── panda.config.ts
│ ├── postcss.config.js
│ ├── README.md
│ └── tsconfig.json
├── prisma-postgres/
│ ├── app/
│ │ ├── api/
│ │ │ └── posts/
│ │ │ └── route.ts
│ │ ├── posts/
│ │ │ ├── [id]/
│ │ │ │ └── page.tsx
│ │ │ ├── new/
│ │ │ │ └── page.tsx
│ │ │ └── page.tsx
│ │ ├── setup/
│ │ │ └── page.tsx
│ │ ├── users/
│ │ │ └── new/
│ │ │ └── page.tsx
│ │ ├── favicon.ico
│ │ ├── globals.css
│ │ ├── Header.tsx
│ │ ├── layout.tsx
│ │ └── page.tsx
│ ├── lib/
│ │ └── prisma.ts
│ ├── prisma/
│ │ ├── schema.prisma
│ │ └── seed.ts
│ ├── .gitignore [IGNORADO]
│ ├── next.config.ts
│ ├── package.json
│ ├── postcss.config.mjs
│ ├── README.md
│ ├── tailwind.config.ts
│ └── tsconfig.json
├── radix-ui/
│ ├── app/
│ │ ├── layout.tsx
│ │ └── page.tsx
│ ├── styles/
│ │ └── globals.css
│ ├── .gitignore [IGNORADO]
│ ├── package.json
│ ├── postcss.config.js
│ ├── README.md
│ ├── tailwind.config.js
│ └── tsconfig.json
├── react-remove-properties/
│ ├── app/
│ │ ├── layout.tsx
│ │ └── page.tsx
│ ├── .gitignore [IGNORADO]
│ ├── next.config.js
│ ├── package.json
│ ├── README.md
│ └── tsconfig.json
├── remove-console/
│ ├── app/
│ │ ├── layout.tsx
│ │ └── page.tsx
│ ├── .gitignore [IGNORADO]
│ ├── next.config.ts
│ ├── package.json
│ ├── README.md
│ └── tsconfig.json
├── reproduction-template/
│ ├── .codesandbox/
│ │ └── tasks.json
│ ├── app/
│ │ ├── favicon.ico
│ │ ├── layout.tsx
│ │ └── page.tsx
│ ├── .gitignore [IGNORADO]
│ ├── next.config.ts
│ ├── package.json
│ ├── README.md
│ └── tsconfig.json
├── reproduction-template-pages/
│ ├── .codesandbox/
│ │ └── tasks.json
│ ├── pages/
│ │ └── index.tsx
│ ├── public/ [IGNORADO]
│ ├── .gitignore [IGNORADO]
│ ├── next.config.ts
│ ├── package.json
│ ├── README.md
│ └── tsconfig.json
├── with-ably/
│ ├── pages/
│ │ ├── api/
│ │ │ ├── createTokenRequest.ts
│ │ │ └── send-message.ts
│ │ ├── \_app.tsx
│ │ └── index.tsx
│ ├── public/ [IGNORADO]
│ ├── styles/
│ │ ├── globals.css
│ │ └── Home.module.css
│ ├── .gitignore [IGNORADO]
│ ├── package.json
│ ├── README.md
│ ├── tsconfig.json
│ └── types.d.ts
├── with-absolute-imports/
│ ├── app/
│ │ ├── layout.tsx
│ │ └── page.tsx
│ ├── components/
│ │ ├── button.tsx
│ │ └── header.tsx
│ ├── .gitignore [IGNORADO]
│ ├── package.json
│ ├── README.md
│ └── tsconfig.json
├── with-algolia-react-instantsearch/
│ ├── app/
│ │ ├── layout.tsx
│ │ └── page.tsx
│ ├── components/
│ │ ├── Panel.tsx
│ │ └── Search.tsx
│ ├── styles/
│ │ └── global.css
│ ├── .gitignore [IGNORADO]
│ ├── package.json
│ ├── README.md
│ └── tsconfig.json
├── with-ant-design/
│ ├── app/
│ │ ├── AntdRegistry.tsx
│ │ ├── favicon.ico
│ │ ├── globals.css
│ │ ├── layout.tsx
│ │ ├── page.tsx
│ │ └── themeConfig.ts
│ ├── .gitignore [IGNORADO]
│ ├── next.config.js
│ ├── package.json
│ ├── README.md
│ └── tsconfig.json
├── with-apivideo/
│ ├── components/
│ │ ├── Card/
│ │ │ ├── Card.module.css
│ │ │ └── index.tsx
│ │ ├── Loader/
│ │ │ ├── index.tsx
│ │ │ └── Loader.module.css
│ │ └── Status/
│ │ ├── index.tsx
│ │ └── Status.module.css
│ ├── pages/
│ │ ├── api/
│ │ │ ├── [videoId].ts
│ │ │ ├── uploadToken.ts
│ │ │ └── videos.ts
│ │ ├── uploader/
│ │ │ └── index.tsx
│ │ ├── videos/
│ │ │ ├── [videoId].tsx
│ │ │ └── index.tsx
│ │ ├── \_app.tsx
│ │ └── index.tsx
│ ├── public/ [IGNORADO]
│ ├── style/
│ │ ├── common.css
│ │ └── index.css
│ ├── .env.local.example
│ ├── .gitignore [IGNORADO]
│ ├── next.config.js
│ ├── package.json
│ ├── README.md
│ └── tsconfig.json
├── with-apollo/
│ ├── src/
│ │ ├── app/
│ │ │ ├── favicon.ico
│ │ │ ├── globals.css
│ │ │ ├── layout.tsx
│ │ │ ├── loading.tsx
│ │ │ └── page.tsx
│ │ ├── components/
│ │ │ ├── ApolloClientProvider.tsx
│ │ │ ├── FiveRocketsClient.tsx
│ │ │ └── LatestMissionName.tsx
│ │ └── lib/
│ │ └── ApolloClient.ts
│ ├── .gitignore [IGNORADO]
│ ├── next.config.mjs
│ ├── package.json
│ ├── README.md
│ └── tsconfig.json
├── with-apollo-and-redux/
│ ├── components/
│ │ ├── Clock.js
│ │ ├── Counter.js
│ │ ├── ErrorMessage.js
│ │ ├── Layout.js
│ │ ├── Nav.js
│ │ ├── PostList.js
│ │ ├── PostUpvoter.js
│ │ └── Submit.js
│ ├── lib/
│ │ ├── apollo.js
│ │ ├── redux.js
│ │ └── useInterval.js
│ ├── pages/
│ │ ├── \_app.js
│ │ ├── apollo.js
│ │ ├── index.js
│ │ └── redux.js
│ ├── .gitignore [IGNORADO]
│ ├── package.json
│ └── README.md
├── with-axiom/
│ ├── pages/
│ │ ├── api/
│ │ │ └── hello.ts
│ │ ├── \_app.tsx
│ │ └── index.tsx
│ ├── .gitignore [IGNORADO]
│ ├── middleware.ts
│ ├── next.config.js
│ ├── package.json
│ ├── README.md
│ └── tsconfig.json
├── with-azure-cosmos/
│ ├── lib/
│ │ └── cosmosdb.ts
│ ├── pages/
│ │ └── index.tsx
│ ├── public/ [IGNORADO]
│ ├── .env.local.example
│ ├── .gitignore [IGNORADO]
│ ├── package.json
│ ├── README.md
│ └── tsconfig.json
├── with-babel-macros/
│ ├── app/
│ │ ├── layout.tsx
│ │ └── page.tsx
│ ├── .babelrc
│ ├── .gitignore [IGNORADO]
│ ├── package.json
│ ├── pnpm-lock.yaml [IGNORADO]
│ ├── README.md
│ └── tsconfig.json
├── with-biome/
│ ├── app/
│ │ ├── layout.tsx
│ │ └── page.tsx
│ ├── .gitignore [IGNORADO]
│ ├── biome.json
│ ├── package.json
│ ├── README.md
│ └── tsconfig.json
├── with-chakra-ui/
│ ├── src/
│ │ ├── components/
│ │ │ ├── Container.tsx
│ │ │ ├── CTA.tsx
│ │ │ ├── DarkModeSwitch.tsx
│ │ │ ├── Footer.tsx
│ │ │ ├── Hero.tsx
│ │ │ └── Main.tsx
│ │ ├── pages/
│ │ │ ├── \_app.tsx
│ │ │ ├── \_document.tsx
│ │ │ └── index.tsx
│ │ └── theme.tsx
│ ├── .gitignore [IGNORADO]
│ ├── package.json
│ ├── README.md
│ └── tsconfig.json
├── with-clerk/
│ ├── app/
│ │ ├── api/
│ │ │ └── getAuthenticatedUserId/
│ │ │ └── route.ts
│ │ ├── sign-in/
│ │ │ └── [[...sign-in]]/
│ │ │ └── page.tsx
│ │ ├── sign-up/
│ │ │ └── [[...sign-up]]/
│ │ │ └── page.tsx
│ │ ├── user/
│ │ │ └── [[...index]]/
│ │ │ └── page.tsx
│ │ ├── api-request.tsx
│ │ ├── favicon.ico
│ │ ├── layout.tsx
│ │ └── page.tsx
│ ├── public/ [IGNORADO]
│ ├── styles/
│ │ ├── Auth.module.css
│ │ ├── globals.css
│ │ ├── Header.module.css
│ │ ├── Home.module.css
│ │ ├── prism.css
│ │ └── User.module.css
│ ├── .env.local.example
│ ├── .gitignore [IGNORADO]
│ ├── middleware.ts
│ ├── next.config.js
│ ├── package.json
│ ├── README.md
│ └── tsconfig.json
├── with-cloudinary/
│ ├── components/
│ │ ├── Icons/
│ │ │ ├── Bridge.tsx
│ │ │ ├── Logo.tsx
│ │ │ └── Twitter.tsx
│ │ ├── Carousel.tsx
│ │ ├── Modal.tsx
│ │ └── SharedModal.tsx
│ ├── pages/
│ │ ├── p/
│ │ │ └── [photoId].tsx
│ │ ├── \_app.tsx
│ │ ├── \_document.tsx
│ │ └── index.tsx
│ ├── public/ [IGNORADO]
│ ├── styles/
│ │ └── index.css
│ ├── utils/
│ │ ├── animationVariants.ts
│ │ ├── cachedImages.ts
│ │ ├── cloudinary.ts
│ │ ├── downloadPhoto.ts
│ │ ├── generateBlurPlaceholder.ts
│ │ ├── range.ts
│ │ ├── types.ts
│ │ └── useLastViewedPhoto.ts
│ ├── .env.local.example
│ ├── .gitignore [IGNORADO]
│ ├── next.config.js
│ ├── package.json
│ ├── postcss.config.js
│ ├── README.md
│ ├── tailwind.config.js
│ └── tsconfig.json
├── with-compiled-css/
│ ├── components/
│ │ ├── class-names-box.js
│ │ └── styled-button.js
│ ├── pages/
│ │ └── index.js
│ ├── style/
│ │ └── colors.js
│ ├── .babelrc
│ ├── .gitignore [IGNORADO]
│ ├── next.config.js
│ ├── package.json
│ └── README.md
├── with-contentlayer/
│ ├── pages/
│ │ ├── posts/
│ │ │ └── [id].js
│ │ ├── \_app.js
│ │ └── index.js
│ ├── posts/
│ │ ├── pre-rendering.md
│ │ └── ssg-ssr.md
│ ├── styles/
│ │ ├── globals.css
│ │ └── utils.module.css
│ ├── .gitignore [IGNORADO]
│ ├── contentlayer.config.js
│ ├── jsconfig.json
│ ├── next.config.js
│ ├── package.json
│ └── README.md
├── with-context-api/
│ ├── \_components/
│ │ └── Counter.tsx
│ ├── app/
│ │ ├── about/
│ │ │ └── page.tsx
│ │ ├── layout.tsx
│ │ └── page.tsx
│ ├── .gitignore [IGNORADO]
│ ├── package.json
│ ├── README.md
│ └── tsconfig.json
├── with-cookies-next/
│ ├── pages/
│ │ ├── api/
│ │ │ ├── get-api-cookie.ts
│ │ │ ├── remove-api-cookie.ts
│ │ │ └── set-api-cookie.ts
│ │ ├── index.tsx
│ │ └── ssr-cookies.tsx
│ ├── .gitignore [IGNORADO]
│ ├── package.json
│ ├── README.md
│ └── tsconfig.json
├── with-couchbase/
│ ├── pages/
│ │ ├── \_app.js
│ │ └── index.js
│ ├── public/ [IGNORADO]
│ ├── styles/
│ │ ├── globals.css
│ │ └── Home.module.css
│ ├── util/
│ │ └── couchbase.js
│ ├── .env.local.example
│ ├── .gitignore [IGNORADO]
│ ├── package.json
│ └── README.md
├── with-custom-babel-config/
│ ├── pages/
│ │ └── index.js
│ ├── .babelrc
│ ├── .gitignore [IGNORADO]
│ ├── package.json
│ └── README.md
├── with-cxs/
│ ├── pages/
│ │ ├── \_document.tsx
│ │ └── index.tsx
│ ├── .gitignore [IGNORADO]
│ ├── package.json
│ ├── README.md
│ └── tsconfig.json
├── with-cypress/
│ ├── app/
│ │ ├── about/
│ │ │ └── page.tsx
│ │ ├── layout.tsx
│ │ └── page.tsx
│ ├── components/
│ │ ├── about-component.cy.tsx
│ │ └── about-component.tsx
│ ├── cypress/
│ │ ├── e2e/
│ │ │ ├── app.cy.ts
│ │ │ └── pages.cy.ts
│ │ ├── fixtures/
│ │ │ └── example.json
│ │ ├── support/
│ │ │ ├── commands.ts
│ │ │ ├── component-index.html
│ │ │ ├── component.ts
│ │ │ └── e2e.ts
│ │ └── tsconfig.json
│ ├── pages/
│ │ ├── home/
│ │ │ ├── about.tsx
│ │ │ └── index.tsx
│ │ └── \_app.tsx
│ ├── public/ [IGNORADO]
│ ├── styles/
│ │ ├── globals.css
│ │ └── Home.module.css
│ ├── .gitignore [IGNORADO]
│ ├── cypress.config.ts
│ ├── package.json
│ ├── README.md
│ └── tsconfig.json
├── with-docker/
│ ├── pages/
│ │ ├── api/
│ │ │ └── hello.js
│ │ ├── \_app.js
│ │ └── index.js
│ ├── public/ [IGNORADO]
│ ├── styles/
│ │ ├── globals.css
│ │ └── Home.module.css
│ ├── .dockerignore
│ ├── .gitignore [IGNORADO]
│ ├── app.json
│ ├── Dockerfile
│ ├── Dockerfile.bun
│ ├── next.config.js
│ ├── package.json
│ └── README.md
├── with-docker-compose/
│ ├── next-app/
│ │ ├── public/ [IGNORADO]
│ │ ├── src/
│ │ │ ├── pages/
│ │ │ │ ├── \_app.tsx
│ │ │ │ └── index.tsx
│ │ │ └── styles/
│ │ │ ├── globals.css
│ │ │ └── Home.module.css
│ │ ├── .gitignore [IGNORADO]
│ │ ├── dev.Dockerfile
│ │ ├── next.config.js
│ │ ├── package.json
│ │ ├── prod-without-multistage.Dockerfile
│ │ ├── prod.Dockerfile
│ │ └── tsconfig.json
│ ├── .dockerignore
│ ├── .env [IGNORADO]
│ ├── .gitignore [IGNORADO]
│ ├── compose.dev.yaml
│ ├── compose.prod-without-multistage.yaml
│ ├── compose.prod.yaml
│ └── README.md
├── with-docker-multi-env/
│ ├── docker/
│ │ ├── development/
│ │ │ ├── compose.yaml
│ │ │ └── Dockerfile
│ │ ├── production/
│ │ │ ├── compose.yaml
│ │ │ └── Dockerfile
│ │ └── staging/
│ │ ├── compose.yaml
│ │ └── Dockerfile
│ ├── pages/
│ │ ├── api/
│ │ │ └── hello.js
│ │ ├── \_app.js
│ │ └── index.js
│ ├── public/ [IGNORADO]
│ ├── styles/
│ │ ├── globals.css
│ │ └── Home.module.css
│ ├── .dockerignore
│ ├── .env [IGNORADO]
│ ├── .env.development.sample
│ ├── .env.production.sample
│ ├── .env.staging.sample
│ ├── .gitignore [IGNORADO]
│ ├── Makefile
│ ├── next.config.js
│ ├── package.json
│ └── README.md
├── with-dynamic-import/
│ ├── app/
│ │ ├── \_components/
│ │ │ ├── Header.tsx
│ │ │ ├── hello1.tsx
│ │ │ ├── hello2.tsx
│ │ │ ├── hello3.tsx
│ │ │ ├── hello4.tsx
│ │ │ └── hello5.tsx
│ │ ├── layout.tsx
│ │ └── page.tsx
│ ├── .gitignore [IGNORADO]
│ ├── package.json
│ ├── README.md
│ └── tsconfig.json
├── with-edgedb/
│ ├── components/
│ │ ├── Header.tsx
│ │ ├── Layout.tsx
│ │ └── Post.tsx
│ ├── dbschema/
│ │ ├── migrations/ [IGNORADO]
│ │ └── default.esdl
│ ├── pages/
│ │ ├── api/
│ │ │ ├── post/
│ │ │ │ ├── [id].ts
│ │ │ │ └── index.ts
│ │ │ └── publish/
│ │ │ └── [id].ts
│ │ ├── blog/
│ │ │ └── [id].tsx
│ │ ├── create.tsx
│ │ ├── drafts.tsx
│ │ └── index.tsx
│ ├── .eslintignore
│ ├── .gitignore [IGNORADO]
│ ├── client.ts
│ ├── edgedb.toml
│ ├── package.json
│ ├── README.md
│ ├── seed.ts
│ └── tsconfig.json
├── with-elasticsearch/
│ ├── lib/
│ │ └── elasticsearch.ts
│ ├── pages/
│ │ ├── \_app.tsx
│ │ └── index.tsx
│ ├── public/ [IGNORADO]
│ ├── styles/
│ │ ├── globals.css
│ │ └── Home.module.css
│ ├── .env.local.example
│ ├── .gitignore [IGNORADO]
│ ├── package.json
│ ├── README.md
│ └── tsconfig.json
├── with-electron/
│ ├── main/
│ │ ├── index.js
│ │ └── preload.js
│ ├── renderer/
│ │ ├── pages/
│ │ │ └── index.js
│ │ └── babel.config.js
│ ├── .gitignore [IGNORADO]
│ ├── next.config.js
│ ├── package.json
│ └── README.md
├── with-electron-typescript/
│ ├── electron-src/
│ │ ├── electron-next.d.ts
│ │ ├── index.ts
│ │ ├── preload.ts
│ │ └── tsconfig.json
│ ├── renderer/
│ │ ├── components/
│ │ │ ├── Layout.tsx
│ │ │ ├── List.tsx
│ │ │ ├── ListDetail.tsx
│ │ │ └── ListItem.tsx
│ │ ├── interfaces/
│ │ │ └── index.ts
│ │ ├── pages/
│ │ │ ├── detail/
│ │ │ │ └── [id].tsx
│ │ │ ├── about.tsx
│ │ │ ├── index.tsx
│ │ │ └── initial-props.tsx
│ │ ├── utils/
│ │ │ └── sample-api.ts
│ │ └── tsconfig.json
│ ├── .gitignore [IGNORADO]
│ ├── next.config.js
│ ├── package.json
│ └── README.md
├── with-emotion/
│ ├── pages/
│ │ ├── \_app.tsx
│ │ └── index.tsx
│ ├── shared/
│ │ └── styles.tsx
│ ├── .gitignore [IGNORADO]
│ ├── next.config.js
│ ├── package.json
│ ├── README.md
│ └── tsconfig.json
├── with-eslint/
│ ├── app/
│ │ ├── layout.tsx
│ │ └── page.tsx
│ ├── .eslintrc
│ ├── .gitignore [IGNORADO]
│ ├── package.json
│ ├── README.md
│ └── tsconfig.json
├── with-expo-typescript/
│ ├── pages/
│ │ ├── \_document.tsx
│ │ └── index.tsx
│ ├── public/ [IGNORADO]
│ ├── .gitignore [IGNORADO]
│ ├── App.tsx
│ ├── babel.config.js
│ ├── next.config.js
│ ├── package.json
│ ├── README.md
│ └── tsconfig.json
├── with-facebook-pixel/
│ ├── \_pages/
│ │ ├── \_app.js
│ │ ├── \_document.js
│ │ ├── index.js
│ │ └── navigation.js
│ ├── app/
│ │ ├── about/
│ │ │ └── page.js
│ │ ├── components/
│ │ │ ├── FacebookPixel.js
│ │ │ └── index.js
│ │ ├── layout.js
│ │ ├── page.js
│ │ └── readme.txt
│ ├── lib/
│ │ └── fpixel.js
│ ├── public/ [IGNORADO]
│ ├── .env.local.example
│ ├── .gitignore [IGNORADO]
│ ├── package.json
│ └── README.md
├── with-fela/
│ ├── pages/
│ │ ├── \_app.js
│ │ ├── \_document.js
│ │ └── index.js
│ ├── .gitignore [IGNORADO]
│ ├── FelaProvider.js
│ ├── getFelaRenderer.js
│ ├── package.json
│ └── README.md
├── with-filbert/
│ ├── pages/
│ │ ├── \_document.js
│ │ └── index.js
│ ├── public/ [IGNORADO]
│ ├── .babelrc
│ ├── .gitignore [IGNORADO]
│ ├── package.json
│ └── README.md
├── with-fingerprintjs-pro/
│ ├── components/
│ │ ├── CacheStrategySelector.tsx
│ │ ├── Nav.tsx
│ │ ├── Toggler.tsx
│ │ ├── types.ts
│ │ └── VisitorDataPresenter.tsx
│ ├── pages/
│ │ ├── home/
│ │ │ └── [cacheStrategy].tsx
│ │ ├── signin/
│ │ │ └── [cacheStrategy].tsx
│ │ └── \_app.tsx
│ ├── providers/
│ │ ├── InMemoryCache.tsx
│ │ ├── LocalStorageCache.tsx
│ │ ├── SessionStorageCache.tsx
│ │ └── WithoutCache.tsx
│ ├── public/ [IGNORADO]
│ ├── styles/
│ │ ├── App.css
│ │ └── globals.css
│ ├── .env.local.example
│ ├── .gitignore [IGNORADO]
│ ├── next.config.js
│ ├── package.json
│ ├── README.md
│ └── tsconfig.json
├── with-firebase/
│ ├── context/
│ │ └── userContext.js
│ ├── fetchData/
│ │ └── getProfileData.js
│ ├── firebase/
│ │ ├── clientApp.js
│ │ └── nodeApp.js
│ ├── pages/
│ │ ├── profile/
│ │ │ └── [username].js
│ │ ├── \_app.js
│ │ └── index.js
│ ├── public/ [IGNORADO]
│ ├── .env.local.example
│ ├── .gitignore [IGNORADO]
│ ├── package.json
│ ├── README.md
│ └── vercel.json
├── with-firebase-cloud-messaging/
│ ├── pages/
│ │ └── index.js
│ ├── public/ [IGNORADO]
│ ├── utils/
│ │ └── webPush.js
│ ├── .gitignore [IGNORADO]
│ ├── package.json
│ └── README.md
├── with-firebase-hosting/
│ ├── public/ [IGNORADO]
│ ├── src/
│ │ ├── components/
│ │ │ ├── App.jsx
│ │ │ └── Header.jsx
│ │ ├── pages/
│ │ │ ├── about.jsx
│ │ │ └── index.jsx
│ │ └── next.config.js
│ ├── .firebaserc
│ ├── .gitignore [IGNORADO]
│ ├── firebase.json
│ ├── firebaseFunctions.js
│ ├── package.json
│ └── README.md
├── with-flow/
│ ├── components/
│ │ └── Page.js
│ ├── flow-typed/
│ │ └── next.js.flow
│ ├── pages/
│ │ ├── \_app.js
│ │ ├── about.js
│ │ ├── contact.js
│ │ └── index.js
│ ├── .babelrc
│ ├── .eslintrc.json
│ ├── .flowconfig
│ ├── .gitignore [IGNORADO]
│ ├── package.json
│ ├── README.md
│ └── with-flow.gif
├── with-formspree/
│ ├── components/
│ │ └── contact-form.js
│ ├── pages/
│ │ ├── \_app.js
│ │ └── index.js
│ ├── public/ [IGNORADO]
│ ├── styles/
│ │ ├── form.module.css
│ │ ├── globals.css
│ │ └── Home.module.css
│ ├── .gitignore [IGNORADO]
│ ├── package.json
│ └── README.md
├── with-framer-motion/
│ ├── components/
│ │ ├── Gallery.js
│ │ └── SingleImage.js
│ ├── pages/
│ │ ├── image/
│ │ │ └── [index].js
│ │ ├── \_app.js
│ │ └── index.js
│ ├── .gitignore [IGNORADO]
│ ├── constants.js
│ ├── package.json
│ └── README.md
├── with-goober/
│ ├── app/
│ │ ├── layout.tsx
│ │ └── page.tsx
│ ├── .gitignore [IGNORADO]
│ ├── package.json
│ ├── README.md
│ └── tsconfig.json
├── with-google-analytics/
│ ├── app/
│ │ ├── about/
│ │ │ └── page.tsx
│ │ ├── contact/
│ │ │ └── page.tsx
│ │ ├── layout.tsx
│ │ └── page.tsx
│ ├── components/
│ │ ├── Header.tsx
│ │ └── Page.tsx
│ ├── .env.local.example
│ ├── .gitignore [IGNORADO]
│ ├── package.json
│ ├── README.md
│ └── tsconfig.json
├── with-google-maps-embed/
│ ├── app/
│ │ ├── layout.tsx
│ │ └── page.tsx
│ ├── .env.local.example
│ ├── .gitignore [IGNORADO]
│ ├── package.json
│ ├── README.md
│ └── tsconfig.json
├── with-google-tag-manager/
│ ├── \_components/
│ │ └── EventButton.tsx
│ ├── app/
│ │ ├── layout.tsx
│ │ └── page.tsx
│ ├── .env.local.example
│ ├── .gitignore [IGNORADO]
│ ├── package.json
│ ├── README.md
│ └── tsconfig.json
├── with-grafbase/
│ ├── .vscode/ [IGNORADO]
│ ├── app/
│ │ ├── posts/
│ │ │ └── [slug]/
│ │ │ └── page.tsx
│ │ ├── globals.css
│ │ ├── layout.tsx
│ │ └── page.tsx
│ ├── gql/
│ │ ├── fragment-masking.ts
│ │ ├── gql.ts
│ │ ├── graphql.ts
│ │ └── index.ts
│ ├── grafbase/
│ │ └── schema.graphql
│ ├── lib/
│ │ └── grafbase.ts
│ ├── .env.local.example
│ ├── .gitignore [IGNORADO]
│ ├── codegen.ts
│ ├── next.config.js
│ ├── package.json
│ ├── postcss.config.js
│ ├── README.md
│ ├── tailwind.config.js
│ └── tsconfig.json
├── with-graphql-gateway/
│ ├── pages/
│ │ ├── api/
│ │ │ └── graphql.ts
│ │ ├── \_app.tsx
│ │ └── index.tsx
│ ├── public/ [IGNORADO]
│ ├── styles/
│ │ ├── globals.css
│ │ └── Home.module.css
│ ├── .gitignore [IGNORADO]
│ ├── .meshrc.yaml
│ ├── next.config.js
│ ├── package.json
│ ├── README.md
│ └── tsconfig.json
├── with-graphql-hooks/
│ ├── src/
│ │ ├── app/
│ │ │ ├── favicon.ico
│ │ │ ├── globals.css
│ │ │ ├── layout.tsx
│ │ │ └── page.tsx
│ │ └── client-components/
│ │ ├── client-context-provider.tsx
│ │ ├── index.ts
│ │ └── repo-list.tsx
│ ├── .gitignore [IGNORADO]
│ ├── next.config.mjs
│ ├── package.json
│ ├── README.md
│ └── tsconfig.json
├── with-graphql-react/
│ ├── pages/
│ │ ├── \_app.js
│ │ └── index.js
│ ├── .gitignore [IGNORADO]
│ ├── package.json
│ └── README.md
├── with-gsap/
│ ├── components/
│ │ ├── Content.tsx
│ │ ├── Home.tsx
│ │ └── Title.tsx
│ ├── pages/
│ │ ├── \_app.tsx
│ │ └── index.tsx
│ ├── public/ [IGNORADO]
│ ├── .gitignore [IGNORADO]
│ ├── App.scss
│ ├── package.json
│ ├── README.md
│ └── tsconfig.json
├── with-hls-js/
│ ├── components/
│ │ └── video-player.js
│ ├── pages/
│ │ └── index.js
│ ├── public/ [IGNORADO]
│ ├── .gitignore [IGNORADO]
│ ├── package.json
│ └── README.md
├── with-http2/
│ ├── pages/
│ │ ├── about.js
│ │ └── index.js
│ ├── .gitignore [IGNORADO]
│ ├── next.config.js
│ ├── package.json
│ ├── README.md
│ └── server.js
├── with-i18n-next-intl/
│ ├── components/
│ │ ├── Code.js
│ │ ├── Navigation.js
│ │ └── PageLayout.js
│ ├── messages/
│ │ ├── about/
│ │ │ ├── de.json
│ │ │ └── en.json
│ │ ├── index/
│ │ │ ├── de.json
│ │ │ └── en.json
│ │ └── shared/
│ │ ├── de.json
│ │ └── en.json
│ ├── pages/
│ │ ├── \_app.js
│ │ ├── about.js
│ │ └── index.js
│ ├── .gitignore [IGNORADO]
│ ├── next.config.js
│ ├── package.json
│ └── README.md
├── with-i18n-rosetta/
│ ├── components/
│ │ └── title.js
│ ├── hooks/
│ │ └── use-i18n.js
│ ├── lib/
│ │ └── i18n.js
│ ├── locales/
│ │ ├── de.json
│ │ └── en.json
│ ├── pages/
│ │ ├── [lng]/
│ │ │ └── index.js
│ │ ├── \_app.js
│ │ ├── \_document.js
│ │ └── dashboard.js
│ ├── .gitignore [IGNORADO]
│ ├── next.config.js
│ ├── package.json
│ └── README.md
├── with-ionic/
│ ├── \_components/
│ │ ├── Card.tsx
│ │ └── IonicLayout.tsx
│ ├── app/
│ │ ├── favicon.ico
│ │ ├── layout.tsx
│ │ └── page.tsx
│ ├── public/ [IGNORADO]
│ ├── .gitignore [IGNORADO]
│ ├── ionic.d.ts
│ ├── next.config.ts
│ ├── package.json
│ ├── README.md
│ └── tsconfig.json
├── with-iron-session/
│ ├── .gitignore [IGNORADO]
│ └── README.md
├── with-jest/
│ ├── **tests**/
│ │ ├── **snapshots**/
│ │ │ └── snapshot.tsx.snap
│ │ ├── index.test.tsx
│ │ └── snapshot.tsx
│ ├── app/
│ │ ├── blog/
│ │ │ └── [slug]/
│ │ │ ├── page.test.tsx
│ │ │ └── page.tsx
│ │ ├── utils/
│ │ │ ├── add.test.ts
│ │ │ └── add.ts
│ │ ├── counter.test.tsx
│ │ ├── counter.tsx
│ │ ├── layout.tsx
│ │ ├── page.test.tsx
│ │ └── page.tsx
│ ├── pages/
│ │ ├── home/
│ │ │ └── index.tsx
│ │ ├── \_app.tsx
│ │ └── index.module.css
│ ├── public/ [IGNORADO]
│ ├── styles/
│ │ └── global.css
│ ├── .gitignore [IGNORADO]
│ ├── jest.config.js
│ ├── jest.setup.js
│ ├── package.json
│ ├── README.md
│ ├── tsconfig.json
│ └── types.d.ts
├── with-jest-babel/
│ ├── **mocks**/
│ │ ├── fileMock.js
│ │ └── styleMock.js
│ ├── **tests**/
│ │ ├── **snapshots**/
│ │ │ └── snapshot.tsx.snap
│ │ ├── index.test.tsx
│ │ └── snapshot.tsx
│ ├── pages/
│ │ ├── \_app.tsx
│ │ ├── index.module.css
│ │ └── index.tsx
│ ├── public/ [IGNORADO]
│ ├── styles/
│ │ └── global.css
│ ├── .eslintrc.json
│ ├── .gitignore [IGNORADO]
│ ├── jest.config.js
│ ├── jest.setup.js
│ ├── package.json
│ ├── README.md
│ ├── tsconfig.json
│ └── types.d.ts
├── with-joi/
│ ├── pages/
│ │ └── api/
│ │ ├── people/
│ │ │ └── [id].js
│ │ ├── cars.js
│ │ └── people.js
│ ├── server/
│ │ └── api/
│ │ └── middlewares/
│ │ └── validate.js
│ ├── .gitignore [IGNORADO]
│ ├── package.json
│ └── README.md
├── with-jotai/
│ ├── app/
│ │ ├── layout.tsx
│ │ └── page.tsx
│ ├── components/
│ │ └── Canvas.tsx
│ ├── public/ [IGNORADO]
│ ├── styles/
│ │ ├── globals.css
│ │ └── Home.module.css
│ ├── .gitignore [IGNORADO]
│ ├── next.config.js
│ ├── package.json
│ ├── README.md
│ └── tsconfig.json
├── with-kea/
│ ├── pages/
│ │ ├── \_app.js
│ │ └── index.js
│ ├── .gitignore [IGNORADO]
│ ├── package.json
│ ├── README.md
│ └── store.js
├── with-knex/
│ ├── knex/
│ │ ├── migrations/ [IGNORADO]
│ │ └── index.js
│ ├── pages/
│ │ ├── api/
│ │ │ └── todos.js
│ │ └── index.js
│ ├── public/ [IGNORADO]
│ ├── .env.local.example
│ ├── .gitignore [IGNORADO]
│ ├── knexfile.js
│ ├── package.json
│ └── README.md
├── with-linaria/
│ ├── app/
│ │ ├── layout.tsx
│ │ ├── page.tsx
│ │ └── styles.css
│ ├── .babelrc
│ ├── .gitignore [IGNORADO]
│ ├── next.config.js
│ ├── package.json
│ ├── README.md
│ └── tsconfig.json
├── with-lingui/
│ ├── components/
│ │ └── LangSwitcher.js
│ ├── locale/
│ │ ├── en/
│ │ │ └── messages.po
│ │ └── sv/
│ │ └── messages.po
│ ├── pages/
│ │ ├── \_app.js
│ │ ├── index.js
│ │ └── two.js
│ ├── .babelrc
│ ├── .gitignore [IGNORADO]
│ ├── lingui.config.js
│ ├── next.config.js
│ ├── package.json
│ └── README.md
├── with-magic/
│ ├── components/
│ │ ├── form.js
│ │ ├── header.js
│ │ └── layout.js
│ ├── lib/
│ │ ├── auth-cookies.js
│ │ ├── auth.js
│ │ ├── hooks.js
│ │ └── magic.js
│ ├── pages/
│ │ ├── api/
│ │ │ ├── login.js
│ │ │ ├── logout.js
│ │ │ └── user.js
│ │ ├── index.js
│ │ ├── login.js
│ │ └── profile.js
│ ├── public/ [IGNORADO]
│ ├── .env.local.example
│ ├── .gitignore [IGNORADO]
│ ├── package.json
│ └── README.md
├── with-mantine/
│ ├── components/
│ │ ├── Card.tsx
│ │ └── Grid.tsx
│ ├── pages/
│ │ ├── \_app.tsx
│ │ ├── \_document.tsx
│ │ └── index.tsx
│ ├── public/ [IGNORADO]
│ ├── styles/
│ │ └── globals.css
│ ├── .gitignore [IGNORADO]
│ ├── next.config.js
│ ├── package.json
│ ├── prettier.config.js
│ ├── README.md
│ └── tsconfig.json
├── with-mdbreact/
│ ├── pages/
│ │ ├── \_app.js
│ │ └── index.js
│ ├── public/ [IGNORADO]
│ ├── styles/
│ │ └── globals.css
│ ├── .gitignore [IGNORADO]
│ ├── package.json
│ └── README.md
├── with-meilisearch/
│ ├── src/
│ │ ├── assets/
│ │ │ └── meilisearch.svg
│ │ ├── pages/
│ │ │ ├── \_app.js
│ │ │ └── index.tsx
│ │ └── styles/
│ │ └── globals.css
│ ├── .env.development
│ ├── .env.local.example
│ ├── .gitignore [IGNORADO]
│ ├── env.d.ts
│ ├── next.config.js
│ ├── package.json
│ ├── postcss.config.js
│ ├── README.md
│ ├── tailwind.config.ts
│ └── tsconfig.json
├── with-mobx/
│ ├── components/
│ │ ├── Clock.js
│ │ ├── Page.js
│ │ └── StoreProvider.js
│ ├── pages/
│ │ ├── \_app.js
│ │ ├── index.js
│ │ ├── other.js
│ │ ├── ssg.js
│ │ └── ssr.js
│ ├── .gitignore [IGNORADO]
│ ├── package.json
│ ├── README.md
│ └── store.js
├── with-mobx-state-tree/
│ ├── components/
│ │ ├── Clock.tsx
│ │ └── SampleComponent.tsx
│ ├── pages/
│ │ ├── \_app.tsx
│ │ ├── index.tsx
│ │ ├── other.tsx
│ │ ├── ssg.tsx
│ │ └── ssr.tsx
│ ├── .gitignore [IGNORADO]
│ ├── package.json
│ ├── README.md
│ ├── store.ts
│ └── tsconfig.json
├── with-mocha/
│ ├── pages/
│ │ └── index.js
│ ├── test/
│ │ └── index.test.js
│ ├── .babelrc
│ ├── .gitignore [IGNORADO]
│ ├── .mocharc.yml
│ ├── mocha.setup.js
│ ├── package.json
│ └── README.md
├── with-mongodb/
│ ├── app/
│ │ ├── app-demo/
│ │ │ └── page.tsx
│ │ ├── actions.ts
│ │ ├── favicon.ico
│ │ └── layout.tsx
│ ├── lib/
│ │ └── mongodb.ts
│ ├── pages/
│ │ ├── \_app.tsx
│ │ ├── \_document.tsx
│ │ └── index.tsx
│ ├── public/ [IGNORADO]
│ ├── styles/
│ │ └── globals.css
│ ├── .env.local.example
│ ├── .gitignore [IGNORADO]
│ ├── next.config.js
│ ├── package.json
│ ├── postcss.config.js
│ ├── README.md
│ ├── tailwind.config.ts
│ └── tsconfig.json
├── with-mongodb-mongoose/
│ ├── components/
│ │ └── Form.tsx
│ ├── css/
│ │ ├── form.css
│ │ └── style.css
│ ├── lib/
│ │ └── dbConnect.ts
│ ├── models/
│ │ └── Pet.ts
│ ├── pages/
│ │ ├── [id]/
│ │ │ ├── edit.tsx
│ │ │ └── index.tsx
│ │ ├── api/
│ │ │ └── pets/
│ │ │ ├── [id].ts
│ │ │ └── index.ts
│ │ ├── \_app.tsx
│ │ ├── \_document.tsx
│ │ ├── index.tsx
│ │ └── new.tsx
│ ├── public/ [IGNORADO]
│ ├── .env.local.example
│ ├── .gitignore [IGNORADO]
│ ├── package.json
│ ├── README.md
│ └── tsconfig.json
├── with-mqtt-js/
│ ├── app/
│ │ ├── layout.tsx
│ │ └── page.tsx
│ ├── lib/
│ │ └── useMqtt.ts
│ ├── .env.local.example
│ ├── .gitignore [IGNORADO]
│ ├── environment.d.ts
│ ├── package.json
│ ├── README.md
│ └── tsconfig.json
├── with-msw/
│ ├── mocks/
│ │ ├── browser.ts
│ │ ├── handlers.ts
│ │ ├── index.ts
│ │ ├── server.ts
│ │ └── types.ts
│ ├── pages/
│ │ ├── \_app.tsx
│ │ └── index.tsx
│ ├── public/ [IGNORADO]
│ ├── .env.development
│ ├── .env.production
│ ├── .gitignore [IGNORADO]
│ ├── package.json
│ ├── README.md
│ └── tsconfig.json
├── with-mux-video/
│ ├── app/
│ │ ├── \_components/
│ │ │ └── Link.tsx
│ │ ├── (upload)/
│ │ │ ├── asset/
│ │ │ │ └── [assetId]/
│ │ │ │ ├── AssetStatusPoll.tsx
│ │ │ │ ├── layout.tsx
│ │ │ │ ├── loading.tsx
│ │ │ │ ├── page.tsx
│ │ │ │ └── types.ts
│ │ │ ├── layout.tsx
│ │ │ ├── loading.tsx
│ │ │ ├── MuxUploader.tsx
│ │ │ └── page.tsx
│ │ ├── v/
│ │ │ └── [playbackId]/
│ │ │ ├── MuxPlayer.tsx
│ │ │ └── page.tsx
│ │ ├── apple-icon.png
│ │ ├── constants.ts
│ │ ├── favicon.ico
│ │ ├── globals.css
│ │ ├── icon.svg
│ │ ├── layout.tsx
│ │ ├── mux.svg
│ │ ├── opengraph-image.png
│ │ └── twitter-image.png
│ ├── .env.local.example
│ ├── .gitignore [IGNORADO]
│ ├── next.config.mjs
│ ├── package.json
│ ├── postcss.config.js
│ ├── README.md
│ ├── tailwind.config.js
│ └── tsconfig.json
├── with-mysql/
│ ├── components/
│ │ └── Product.js
│ ├── lib/
│ │ └── prisma.js
│ ├── pages/
│ │ ├── api/
│ │ │ └── products.js
│ │ ├── \_app.js
│ │ └── index.js
│ ├── prisma/
│ │ ├── data.js
│ │ ├── schema.prisma
│ │ └── seed.js
│ ├── public/ [IGNORADO]
│ ├── styles/
│ │ └── globals.css
│ ├── .env.example
│ ├── .gitignore [IGNORADO]
│ ├── next.config.js
│ ├── package.json
│ ├── postcss.config.js
│ ├── README.md
│ └── tailwind.config.js
├── with-neo4j/
│ ├── components/
│ │ ├── footer.js
│ │ └── header.js
│ ├── lib/
│ │ └── fetcher.js
│ ├── pages/
│ │ ├── actor/
│ │ │ └── [name].js
│ │ ├── api/
│ │ │ ├── actors/
│ │ │ │ └── [name].js
│ │ │ └── movies/
│ │ │ ├── [title].js
│ │ │ └── index.js
│ │ ├── movie/
│ │ │ └── [title].js
│ │ ├── \_app.js
│ │ └── index.js
│ ├── public/ [IGNORADO]
│ ├── styles/
│ │ └── global.js
│ ├── util/
│ │ └── neo4j.js
│ ├── .env.local.example
│ ├── .gitignore [IGNORADO]
│ ├── movie-sample.md
│ ├── package.json
│ └── README.md
├── with-next-page-transitions/
│ ├── components/
│ │ └── Loader.js
│ ├── pages/
│ │ ├── \_app.js
│ │ ├── \_document.js
│ │ ├── about.js
│ │ └── index.js
│ ├── .gitignore [IGNORADO]
│ ├── package.json
│ └── README.md
├── with-next-seo/
│ ├── pages/
│ │ ├── \_app.js
│ │ ├── index.js
│ │ └── jsonld.js
│ ├── .gitignore [IGNORADO]
│ ├── next-seo.config.js
│ ├── package.json
│ └── README.md
├── with-next-sitemap/
│ ├── pages/
│ │ ├── [dynamic].tsx
│ │ └── index.tsx
│ ├── .gitignore [IGNORADO]
│ ├── next-sitemap.config.js
│ ├── package.json
│ ├── README.md
│ └── tsconfig.json
├── with-next-translate/
│ ├── app/
│ │ ├── [lang]/
│ │ │ └── page.js
│ │ ├── layout.js
│ │ └── style.css
│ ├── locales/
│ │ ├── ar/
│ │ │ ├── common.json
│ │ │ └── home.json
│ │ ├── ca/
│ │ │ ├── common.json
│ │ │ └── home.json
│ │ ├── en/
│ │ │ ├── common.json
│ │ │ └── home.json
│ │ └── he/
│ │ ├── common.json
│ │ └── home.json
│ ├── public/ [IGNORADO]
│ ├── .gitignore [IGNORADO]
│ ├── i18n.json
│ ├── next.config.js
│ ├── package.json
│ └── README.md
├── with-next-ui/
│ ├── common/
│ │ └── interface.ts
│ ├── components/
│ │ ├── Checkbox.tsx
│ │ ├── Collapse.tsx
│ │ ├── Mail.tsx
│ │ ├── Password.tsx
│ │ └── Table.tsx
│ ├── pages/
│ │ ├── \_app.tsx
│ │ ├── \_document.tsx
│ │ └── index.tsx
│ ├── public/ [IGNORADO]
│ ├── styles/
│ │ ├── globals.css
│ │ └── Home.module.css
│ ├── .gitignore [IGNORADO]
│ ├── next.config.js
│ ├── package.json
│ ├── README.md
│ └── tsconfig.json
├── with-nhost-auth-realtime-graphql/
│ ├── components/
│ │ └── private-route.js
│ ├── pages/
│ │ ├── api/
│ │ │ └── hello.js
│ │ ├── \_app.js
│ │ ├── index.js
│ │ ├── login.js
│ │ └── register.js
│ ├── setup/
│ │ ├── data.sql
│ │ └── hasura-metadata.json
│ ├── utils/
│ │ └── nhost.js
│ ├── .env.local.example
│ ├── .gitignore [IGNORADO]
│ ├── package.json
│ └── README.md
├── with-opentelemetry/
│ ├── app/
│ │ ├── layout.tsx
│ │ └── page.tsx
│ ├── pages/
│ │ ├── api/
│ │ │ └── github-stars.ts
│ │ └── legacy.tsx
│ ├── shared/
│ │ └── fetch-github-stars.ts
│ ├── .gitignore [IGNORADO]
│ ├── instrumentation.ts
│ ├── next.config.js
│ ├── package.json
│ ├── README.md
│ └── tsconfig.json
├── with-orbit-components/
│ ├── app/
│ │ ├── globals.css
│ │ ├── layout.tsx
│ │ └── page.tsx
│ ├── .gitignore [IGNORADO]
│ ├── package.json
│ ├── README.md
│ ├── tailwind.config.js
│ └── tsconfig.json
├── with-overmind/
│ ├── components/
│ │ ├── Header.js
│ │ └── Items.js
│ ├── overmind/
│ │ └── index.js
│ ├── pages/
│ │ ├── \_app.js
│ │ ├── about.js
│ │ └── index.js
│ ├── .gitignore [IGNORADO]
│ ├── package.json
│ └── README.md
├── with-oxlint/
│ ├── app/
│ │ ├── layout.tsx
│ │ └── page.tsx
│ ├── .gitignore [IGNORADO]
│ ├── .oxlintrc.json
│ ├── package.json
│ ├── README.md
│ └── tsconfig.json
├── with-particles/
│ ├── components/
│ │ └── particles.tsx
│ ├── pages/
│ │ ├── \_app.tsx
│ │ └── index.tsx
│ ├── public/ [IGNORADO]
│ ├── styles/
│ │ ├── globals.css
│ │ └── Home.module.css
│ ├── .gitignore [IGNORADO]
│ ├── next.config.js
│ ├── package.json
│ ├── README.md
│ └── tsconfig.json
├── with-passport/
│ ├── components/
│ │ ├── form.js
│ │ ├── header.js
│ │ └── layout.js
│ ├── lib/
│ │ ├── auth-cookies.js
│ │ ├── auth.js
│ │ ├── hooks.js
│ │ ├── password-local.js
│ │ └── user.js
│ ├── pages/
│ │ ├── api/
│ │ │ ├── login.js
│ │ │ ├── logout.js
│ │ │ ├── signup.js
│ │ │ └── user.js
│ │ ├── index.js
│ │ ├── login.js
│ │ ├── profile.js
│ │ └── signup.js
│ ├── .env [IGNORADO]
│ ├── .gitignore [IGNORADO]
│ ├── package.json
│ └── README.md
├── with-passport-and-next-connect/
│ ├── components/
│ │ └── Navbar.js
│ ├── lib/
│ │ ├── auth.js
│ │ ├── db.js
│ │ ├── hooks.jsx
│ │ ├── passport.js
│ │ └── session.js
│ ├── middleware/
│ │ └── auth.js
│ ├── pages/
│ │ ├── api/
│ │ │ ├── login.js
│ │ │ ├── logout.js
│ │ │ ├── user.js
│ │ │ └── users.js
│ │ ├── \_app.js
│ │ ├── index.js
│ │ ├── login.js
│ │ ├── profile.js
│ │ └── signup.js
│ ├── .env [IGNORADO]
│ ├── .gitignore [IGNORADO]
│ ├── package.json
│ ├── README.md
│ └── styles.css
├── with-paste-typescript/
│ ├── pages/
│ │ ├── \_app.tsx
│ │ └── index.tsx
│ ├── public/ [IGNORADO]
│ ├── .gitignore [IGNORADO]
│ ├── package.json
│ ├── README.md
│ └── tsconfig.json
├── with-plausible/
│ ├── \_components/
│ │ └── Header.tsx
│ ├── app/
│ │ ├── about/
│ │ │ └── page.tsx
│ │ ├── contact/
│ │ │ └── page.tsx
│ │ ├── layout.tsx
│ │ └── page.tsx
│ ├── .env.local.example
│ ├── .gitignore [IGNORADO]
│ ├── package.json
│ ├── README.md
│ └── tsconfig.json
├── with-playwright/
│ ├── app/
│ │ ├── about/
│ │ │ └── page.tsx
│ │ ├── layout.tsx
│ │ └── page.tsx
│ ├── e2e/
│ │ ├── app.spec.ts
│ │ └── pages.spec.ts
│ ├── pages/
│ │ ├── home/
│ │ │ ├── about.tsx
│ │ │ └── index.tsx
│ │ └── \_app.tsx
│ ├── public/ [IGNORADO]
│ ├── styles/
│ │ ├── globals.css
│ │ └── Home.module.css
│ ├── .gitignore [IGNORADO]
│ ├── package.json
│ ├── playwright.config.ts
│ ├── README.md
│ └── tsconfig.json
├── with-polyfills/
│ ├── app/
│ │ ├── layout.tsx
│ │ └── page.tsx
│ ├── .gitignore [IGNORADO]
│ ├── package.json
│ ├── README.md
│ └── tsconfig.json
├── with-portals/
│ ├── components/
│ │ ├── ClientOnlyPortal.js
│ │ └── Modal.js
│ ├── pages/
│ │ ├── \_document.js
│ │ └── index.js
│ ├── .gitignore [IGNORADO]
│ ├── package.json
│ └── README.md
├── with-portals-ssr/
│ ├── pages/
│ │ ├── \_app.js
│ │ ├── \_document.js
│ │ └── index.js
│ ├── .gitignore [IGNORADO]
│ ├── package.json
│ └── README.md
├── with-postgres/
│ ├── .gitignore [IGNORADO]
│ └── README.md
├── with-prefetching/
│ ├── components/
│ │ └── Nav.tsx
│ ├── pages/
│ │ ├── \_app.tsx
│ │ ├── about.tsx
│ │ ├── contact.tsx
│ │ ├── features.tsx
│ │ └── index.tsx
│ ├── .gitignore [IGNORADO]
│ ├── package.json
│ ├── README.md
│ └── tsconfig.json
├── with-quill-js/
│ ├── pages/
│ │ ├── \_app.js
│ │ └── index.js
│ ├── .gitignore [IGNORADO]
│ ├── package.json
│ └── README.md
├── with-rbx-bulma-pro/
│ ├── components/
│ │ └── Layout.js
│ ├── pages/
│ │ ├── \_app.js
│ │ ├── about.js
│ │ ├── contact.js
│ │ └── index.js
│ ├── .gitignore [IGNORADO]
│ ├── package.json
│ └── README.md
├── with-react-bootstrap/
│ ├── pages/
│ │ ├── \_app.jsx
│ │ └── index.jsx
│ ├── public/ [IGNORADO]
│ ├── style/
│ │ └── index.css
│ ├── .gitignore [IGNORADO]
│ ├── package.json
│ └── README.md
├── with-react-ga4/
│ ├── pages/
│ │ ├── \_app.js
│ │ ├── about.js
│ │ └── index.js
│ ├── utils/
│ │ └── analytics.js
│ ├── .gitignore [IGNORADO]
│ ├── package.json
│ └── README.md
├── with-react-hook-form/
│ ├── pages/
│ │ ├── \_app.tsx
│ │ ├── \_document.tsx
│ │ └── index.tsx
│ ├── public/ [IGNORADO]
│ ├── styles/
│ │ ├── global.css
│ │ └── login.module.css
│ ├── .gitignore [IGNORADO]
│ ├── package.json
│ ├── README.md
│ └── tsconfig.json
├── with-react-intl/
│ ├── components/
│ │ ├── Layout.tsx
│ │ ├── Nav.module.css
│ │ └── Nav.tsx
│ ├── helper/
│ │ └── loadIntlMessages.ts
│ ├── lang/
│ │ ├── de.json
│ │ ├── en.json
│ │ └── fr.json
│ ├── pages/
│ │ ├── \_app.tsx
│ │ ├── about.tsx
│ │ └── index.tsx
│ ├── .babelrc
│ ├── .eslintrc
│ ├── .gitignore [IGNORADO]
│ ├── .npmrc
│ ├── next.config.js
│ ├── package.json
│ ├── README.md
│ └── tsconfig.json
├── with-react-md-typescript/
│ ├── components/
│ │ ├── Layout/
│ │ │ ├── index.ts
│ │ │ ├── Layout.tsx
│ │ │ └── navItems.tsx
│ │ └── LinkUnstyled.tsx
│ ├── pages/
│ │ ├── \_app.tsx
│ │ ├── index.tsx
│ │ └── route-1.tsx
│ ├── styles/
│ │ ├── \_variables.scss
│ │ └── app.scss
│ ├── .gitignore [IGNORADO]
│ ├── package.json
│ ├── README.md
│ └── tsconfig.json
├── with-react-multi-carousel/
│ ├── pages/
│ │ └── index.tsx
│ ├── public/ [IGNORADO]
│ ├── .gitignore [IGNORADO]
│ ├── package.json
│ ├── README.md
│ └── tsconfig.json
├── with-react-native-web/
│ ├── pages/
│ │ ├── \_app.js
│ │ ├── \_document.js
│ │ ├── alternate.js
│ │ └── index.js
│ ├── .gitignore [IGNORADO]
│ ├── app.json
│ ├── next.config.js
│ ├── package.json
│ └── README.md
├── with-react-toolbox/
│ ├── pages/
│ │ └── index.js
│ ├── public/ [IGNORADO]
│ ├── .gitignore [IGNORADO]
│ ├── package.json
│ ├── README.md
│ └── theme.js
├── with-reactstrap/
│ ├── pages/
│ │ ├── \_app.jsx
│ │ └── index.jsx
│ ├── public/ [IGNORADO]
│ ├── styles/
│ │ └── index.css
│ ├── .gitignore [IGNORADO]
│ ├── package.json
│ └── README.md
├── with-realm-web/
│ ├── lib/
│ │ └── RealmClient.js
│ ├── pages/
│ │ └── index.js
│ ├── .env [IGNORADO]
│ ├── .gitignore [IGNORADO]
│ ├── package.json
│ └── README.md
├── with-rebass/
│ ├── pages/
│ │ └── index.js
│ ├── .gitignore [IGNORADO]
│ ├── package.json
│ └── README.md
├── with-recoil/
│ ├── components/
│ │ └── counter.js
│ ├── lib/
│ │ └── recoil-atoms.js
│ ├── pages/
│ │ ├── \_app.js
│ │ └── index.js
│ ├── .gitignore [IGNORADO]
│ ├── package.json
│ └── README.md
├── with-redis/
│ ├── app/
│ │ ├── actions.tsx
│ │ ├── favicon.ico
│ │ ├── form.tsx
│ │ ├── globals.css
│ │ ├── layout.tsx
│ │ ├── page.tsx
│ │ └── types.tsx
│ ├── .env.example
│ ├── .gitignore [IGNORADO]
│ ├── package.json
│ ├── postcss.config.js
│ ├── README.md
│ ├── tailwind.config.ts
│ └── tsconfig.json
├── with-redux/
│ ├── app/
│ │ ├── api/
│ │ │ └── counter/
│ │ │ └── route.ts
│ │ ├── components/
│ │ │ ├── counter/
│ │ │ │ ├── Counter.module.css
│ │ │ │ └── Counter.tsx
│ │ │ ├── quotes/
│ │ │ │ ├── Quotes.module.css
│ │ │ │ └── Quotes.tsx
│ │ │ └── Nav.tsx
│ │ ├── quotes/
│ │ │ └── page.tsx
│ │ ├── styles/
│ │ │ ├── globals.css
│ │ │ └── layout.module.css
│ │ ├── verify/
│ │ │ └── page.tsx
│ │ ├── icon.ico
│ │ ├── layout.tsx
│ │ ├── page.tsx
│ │ └── StoreProvider.tsx
│ ├── lib/
│ │ ├── features/
│ │ │ ├── counter/
│ │ │ │ ├── counterAPI.ts
│ │ │ │ └── counterSlice.ts
│ │ │ └── quotes/
│ │ │ └── quotesApiSlice.ts
│ │ ├── createAppSlice.ts
│ │ ├── hooks.ts
│ │ └── store.ts
│ ├── public/ [IGNORADO]
│ ├── .gitignore [IGNORADO]
│ ├── next.config.mjs
│ ├── package.json
│ ├── README.md
│ └── tsconfig.json
├── with-reflexjs/
│ ├── pages/
│ │ ├── \_app.tsx
│ │ ├── \_document.tsx
│ │ └── index.tsx
│ ├── src/
│ │ └── theme.ts
│ ├── .babelrc
│ ├── .gitignore [IGNORADO]
│ ├── package.json
│ ├── README.md
│ └── tsconfig.json
├── with-reflux/
│ ├── actions/
│ │ └── actions.js
│ ├── pages/
│ │ └── index.js
│ ├── store/
│ │ └── counterStore.js
│ ├── .gitignore [IGNORADO]
│ ├── package.json
│ └── README.md
├── with-relay-modern/
│ ├── components/
│ │ ├── BlogPostPreview.js
│ │ └── BlogPosts.js
│ ├── lib/
│ │ └── relay.js
│ ├── pages/
│ │ ├── \_app.js
│ │ ├── about.js
│ │ └── index.js
│ ├── queries/
│ │ └── indexPage.js
│ ├── schema/
│ │ └── init-schema.graphql
│ ├── .babelrc
│ ├── .env [IGNORADO]
│ ├── .gitignore [IGNORADO]
│ ├── .graphqlconfig
│ ├── package.json
│ └── README.md
├── with-rematch/
│ ├── pages/
│ │ ├── \_app.js
│ │ ├── github-users.js
│ │ └── index.js
│ ├── shared/
│ │ ├── components/
│ │ │ ├── counter-display.js
│ │ │ └── header.js
│ │ ├── models/
│ │ │ ├── counter.js
│ │ │ ├── github.js
│ │ │ └── index.js
│ │ ├── store.js
│ │ └── utils.js
│ ├── .gitignore [IGNORADO]
│ ├── package.json
│ └── README.md
├── with-route-as-modal/
│ ├── components/
│ │ ├── Article.js
│ │ ├── Grid.js
│ │ ├── Post.js
│ │ └── styles.module.css
│ ├── pages/
│ │ ├── article/
│ │ │ └── [articleId].js
│ │ ├── post/
│ │ │ └── [postId].js
│ │ ├── \_app.js
│ │ └── index.js
│ ├── .gitignore [IGNORADO]
│ ├── app-styles.module.css
│ ├── package.json
│ └── README.md
├── with-rspack/
│ ├── app/
│ │ ├── layout.tsx
│ │ └── page.tsx
│ ├── .gitignore [IGNORADO]
│ ├── next.config.js
│ ├── package.json
│ ├── README.md
│ └── tsconfig.json
├── with-sass/
│ ├── app/
│ │ ├── layout.tsx
│ │ └── page.tsx
│ ├── components/
│ │ ├── hello-world.module.scss
│ │ └── hello-world.tsx
│ ├── styles/
│ │ └── globals.scss
│ ├── .gitignore [IGNORADO]
│ ├── package.json
│ ├── README.md
│ └── tsconfig.json
├── with-segment-analytics/
│ ├── app/
│ │ ├── about/
│ │ │ └── page.tsx
│ │ ├── contact/
│ │ │ └── page.tsx
│ │ ├── layout.tsx
│ │ └── page.tsx
│ ├── components/
│ │ ├── analytics.tsx
│ │ ├── form.tsx
│ │ └── header.tsx
│ ├── lib/
│ │ └── segment.ts
│ ├── .env.local.example
│ ├── .gitignore [IGNORADO]
│ ├── package.json
│ ├── README.md
│ └── tsconfig.json
├── with-segment-analytics-pages-router/
│ ├── components/
│ │ ├── analytics.tsx
│ │ ├── form.tsx
│ │ └── header.tsx
│ ├── lib/
│ │ └── segment.ts
│ ├── pages/
│ │ ├── \_app.tsx
│ │ ├── about.tsx
│ │ ├── contact.tsx
│ │ └── index.tsx
│ ├── .env.local.example
│ ├── .gitignore [IGNORADO]
│ ├── package.json
│ ├── README.md
│ └── tsconfig.json
├── with-sentry/
│ ├── pages/
│ │ ├── api/
│ │ │ ├── test1.ts
│ │ │ ├── test2.ts
│ │ │ ├── test3.ts
│ │ │ └── test4.ts
│ │ ├── client/
│ │ │ ├── test1.tsx
│ │ │ ├── test2.tsx
│ │ │ ├── test3.tsx
│ │ │ ├── test4.tsx
│ │ │ └── test5.tsx
│ │ ├── ssr/
│ │ │ ├── test1.tsx
│ │ │ ├── test2.tsx
│ │ │ ├── test3.tsx
│ │ │ └── test4.tsx
│ │ ├── \_app.tsx
│ │ ├── \_document.tsx
│ │ ├── \_error.tsx
│ │ ├── 404.tsx
│ │ └── index.tsx
│ ├── public/ [IGNORADO]
│ ├── styles/
│ │ ├── globals.css
│ │ └── Home.module.css
│ ├── .gitignore [IGNORADO]
│ ├── next.config.js
│ ├── package.json
│ ├── README.md
│ ├── sentry.client.config.js
│ ├── sentry.edge.config.js
│ ├── sentry.server.config.js
│ └── tsconfig.json
├── with-service-worker/
│ ├── pages/
│ │ └── index.tsx
│ ├── public/ [IGNORADO]
│ ├── .gitignore [IGNORADO]
│ ├── package.json
│ ├── README.md
│ └── tsconfig.json
├── with-sfcc/
│ ├── components/
│ │ ├── Footer.tsx
│ │ ├── Header.tsx
│ │ └── ProductCard.tsx
│ ├── pages/
│ │ ├── products/
│ │ │ └── [slug].tsx
│ │ ├── \_app.tsx
│ │ ├── \_document.tsx
│ │ └── index.tsx
│ ├── public/ [IGNORADO]
│ ├── styles/
│ │ └── globals.css
│ ├── .env.local.example
│ ├── .gitignore [IGNORADO]
│ ├── next.config.js
│ ├── package.json
│ ├── postcss.config.js
│ ├── README.md
│ ├── sfcc.js
│ ├── tailwind.config.js
│ └── tsconfig.json
├── with-shallow-routing/
│ ├── pages/
│ │ ├── about.js
│ │ └── index.js
│ ├── .gitignore [IGNORADO]
│ ├── package.json
│ └── README.md
├── with-sitemap/
│ ├── app/
│ │ ├── contact/
│ │ │ └── page.tsx
│ │ ├── layout.tsx
│ │ ├── page.tsx
│ │ └── sitemap.ts
│ ├── public/ [IGNORADO]
│ ├── scripts/
│ │ └── generate-sitemap.js
│ ├── .env [IGNORADO]
│ ├── .gitignore [IGNORADO]
│ ├── next.config.js
│ ├── package.json
│ ├── README.md
│ └── tsconfig.json
├── with-slate/
│ ├── app/
│ │ ├── api/
│ │ │ └── editor-state/
│ │ │ └── route.ts
│ │ ├── layout.tsx
│ │ └── page.tsx
│ ├── types/
│ │ └── slate.d.ts
│ ├── .gitignore [IGNORADO]
│ ├── package.json
│ ├── README.md
│ └── tsconfig.json
├── with-static-export/
│ ├── app/
│ │ ├── about/
│ │ │ └── page.tsx
│ │ ├── layout.tsx
│ │ └── page.tsx
│ ├── .gitignore [IGNORADO]
│ ├── next.config.js
│ ├── package.json
│ ├── README.md
│ └── tsconfig.json
├── with-stencil/
│ ├── packages/
│ │ ├── test-component/
│ │ │ ├── src/
│ │ │ │ ├── components/
│ │ │ │ │ └── my-component/
│ │ │ │ │ ├── my-component.css
│ │ │ │ │ ├── my-component.e2e.ts
│ │ │ │ │ ├── my-component.tsx
│ │ │ │ │ └── readme.md
│ │ │ │ ├── utils/
│ │ │ │ │ ├── utils.spec.ts
│ │ │ │ │ └── utils.ts
│ │ │ │ ├── components.d.ts
│ │ │ │ ├── index.html
│ │ │ │ └── index.ts
│ │ │ ├── .gitignore [IGNORADO]
│ │ │ ├── LICENSE
│ │ │ ├── package.json
│ │ │ ├── readme.md
│ │ │ ├── stencil.config.ts
│ │ │ └── tsconfig.json
│ │ └── web-app/
│ │ ├── pages/
│ │ │ ├── \_app.js
│ │ │ └── index.js
│ │ └── package.json
│ ├── .gitignore [IGNORADO]
│ ├── package.json
│ └── README.md
├── with-stitches/
│ ├── app/
│ │ ├── \_components/
│ │ │ └── StitchesLogo.tsx
│ │ ├── layout.tsx
│ │ └── page.tsx
│ ├── public/ [IGNORADO]
│ ├── .gitignore [IGNORADO]
│ ├── next.config.mjs
│ ├── package.json
│ ├── README.md
│ ├── stitches.config.ts
│ └── tsconfig.json
├── with-storybook/
│ ├── .storybook/
│ │ ├── main.ts
│ │ └── preview.ts
│ ├── app/
│ │ ├── favicon.ico
│ │ ├── globals.css
│ │ ├── layout.tsx
│ │ ├── page.module.css
│ │ └── page.tsx
│ ├── public/ [IGNORADO]
│ ├── stories/
│ │ ├── assets/
│ │ │ ├── accessibility.png
│ │ │ ├── accessibility.svg
│ │ │ ├── addon-library.png
│ │ │ ├── assets.png
│ │ │ ├── avif-test-image.avif
│ │ │ ├── context.png
│ │ │ ├── discord.svg
│ │ │ ├── docs.png
│ │ │ ├── figma-plugin.png
│ │ │ ├── github.svg
│ │ │ ├── share.png
│ │ │ ├── styling.png
│ │ │ ├── testing.png
│ │ │ ├── theming.png
│ │ │ ├── tutorials.svg
│ │ │ └── youtube.svg
│ │ ├── button.css
│ │ ├── Button.stories.ts
│ │ ├── Button.tsx
│ │ ├── Configure.mdx
│ │ ├── header.css
│ │ ├── Header.stories.ts
│ │ ├── Header.tsx
│ │ ├── page.css
│ │ ├── Page.stories.ts
│ │ └── Page.tsx
│ ├── .gitignore [IGNORADO]
│ ├── next.config.mjs
│ ├── package.json
│ ├── README.md
│ ├── tsconfig.json
│ └── vercel.json
├── with-strict-csp/
│ ├── app/
│ │ ├── layout.js
│ │ └── page.js
│ ├── .gitignore [IGNORADO]
│ ├── middleware.js
│ ├── package.json
│ └── README.md
├── with-stripe-typescript/
│ ├── app/
│ │ ├── actions/
│ │ │ └── stripe.ts
│ │ ├── api/
│ │ │ └── webhooks/
│ │ │ └── route.ts
│ │ ├── components/
│ │ │ ├── CheckoutForm.tsx
│ │ │ ├── CustomDonationInput.tsx
│ │ │ ├── ElementsForm.tsx
│ │ │ ├── PrintObject.tsx
│ │ │ └── StripeTestCards.tsx
│ │ ├── donate-with-checkout/
│ │ │ ├── result/
│ │ │ │ ├── error.tsx
│ │ │ │ ├── layout.tsx
│ │ │ │ └── page.tsx
│ │ │ └── page.tsx
│ │ ├── donate-with-elements/
│ │ │ ├── result/
│ │ │ │ ├── error.tsx
│ │ │ │ ├── layout.tsx
│ │ │ │ └── page.tsx
│ │ │ └── page.tsx
│ │ ├── donate-with-embedded-checkout/
│ │ │ ├── result/
│ │ │ │ ├── error.tsx
│ │ │ │ ├── layout.tsx
│ │ │ │ └── page.tsx
│ │ │ └── page.tsx
│ │ ├── layout.tsx
│ │ └── page.tsx
│ ├── config/
│ │ └── index.ts
│ ├── lib/
│ │ └── stripe.ts
│ ├── public/ [IGNORADO]
│ ├── utils/
│ │ ├── get-stripejs.ts
│ │ └── stripe-helpers.ts
│ ├── .env.local.example
│ ├── .gitignore [IGNORADO]
│ ├── next.config.js
│ ├── package.json
│ ├── README.md
│ ├── styles.css
│ └── tsconfig.json
├── with-styled-components/
│ ├── app/
│ │ ├── \_components/
│ │ │ ├── cards.tsx
│ │ │ ├── globalstyles.tsx
│ │ │ └── sharedstyles.tsx
│ │ ├── about/
│ │ │ └── page.tsx
│ │ ├── favicon.ico
│ │ ├── layout.tsx
│ │ └── page.tsx
│ ├── lib/
│ │ ├── client-layout.tsx
│ │ └── styled-components-registry.tsx
│ ├── .gitignore [IGNORADO]
│ ├── next.config.mjs
│ ├── package.json
│ ├── README.md
│ ├── styled.d.ts
│ └── tsconfig.json
├── with-styled-jsx/
│ ├── app/
│ │ ├── layout.tsx
│ │ ├── page.tsx
│ │ └── registry.tsx
│ ├── .gitignore [IGNORADO]
│ ├── package.json
│ ├── README.md
│ └── tsconfig.json
├── with-styletron/
│ ├── app/
│ │ ├── layout.tsx
│ │ └── page.tsx
│ ├── .gitignore [IGNORADO]
│ ├── next.config.js
│ ├── package.json
│ ├── README.md
│ ├── styletron.js
│ └── tsconfig.json
├── with-supabase/
│ ├── app/
│ │ ├── auth/
│ │ │ ├── confirm/
│ │ │ │ └── route.ts
│ │ │ ├── error/
│ │ │ │ └── page.tsx
│ │ │ ├── forgot-password/
│ │ │ │ └── page.tsx
│ │ │ ├── login/
│ │ │ │ └── page.tsx
│ │ │ ├── sign-up/
│ │ │ │ └── page.tsx
│ │ │ ├── sign-up-success/
│ │ │ │ └── page.tsx
│ │ │ └── update-password/
│ │ │ └── page.tsx
│ │ ├── protected/
│ │ │ ├── layout.tsx
│ │ │ └── page.tsx
│ │ ├── favicon.ico
│ │ ├── globals.css
│ │ ├── layout.tsx
│ │ ├── opengraph-image.png
│ │ ├── page.tsx
│ │ └── twitter-image.png
│ ├── components/
│ │ ├── tutorial/
│ │ │ ├── code-block.tsx
│ │ │ ├── connect-supabase-steps.tsx
│ │ │ ├── fetch-data-steps.tsx
│ │ │ ├── sign-up-user-steps.tsx
│ │ │ └── tutorial-step.tsx
│ │ ├── ui/
│ │ │ ├── badge.tsx
│ │ │ ├── button.tsx
│ │ │ ├── card.tsx
│ │ │ ├── checkbox.tsx
│ │ │ ├── dropdown-menu.tsx
│ │ │ ├── input.tsx
│ │ │ └── label.tsx
│ │ ├── auth-button.tsx
│ │ ├── deploy-button.tsx
│ │ ├── env-var-warning.tsx
│ │ ├── forgot-password-form.tsx
│ │ ├── hero.tsx
│ │ ├── login-form.tsx
│ │ ├── logout-button.tsx
│ │ ├── next-logo.tsx
│ │ ├── sign-up-form.tsx
│ │ ├── supabase-logo.tsx
│ │ ├── theme-switcher.tsx
│ │ └── update-password-form.tsx
│ ├── lib/
│ │ ├── supabase/
│ │ │ ├── client.ts
│ │ │ ├── middleware.ts
│ │ │ └── server.ts
│ │ └── utils.ts
│ ├── .env.example
│ ├── .gitignore [IGNORADO]
│ ├── components.json
│ ├── eslint.config.mjs
│ ├── middleware.ts
│ ├── next.config.ts
│ ├── package.json
│ ├── postcss.config.mjs
│ ├── README.md
│ ├── tailwind.config.ts
│ └── tsconfig.json
├── with-supertokens/
│ ├── app/
│ │ ├── api/
│ │ │ ├── auth/
│ │ │ │ └── [...path]/
│ │ │ │ └── route.ts
│ │ │ └── user/
│ │ │ └── route.ts
│ │ ├── auth/
│ │ │ └── [[...path]]/
│ │ │ └── page.tsx
│ │ ├── components/
│ │ │ ├── callApiButton.tsx
│ │ │ ├── home.tsx
│ │ │ ├── linksComponent.tsx
│ │ │ ├── sessionAuthForNextJS.tsx
│ │ │ ├── supertokensProvider.tsx
│ │ │ └── tryRefreshClientComponent.tsx
│ │ ├── config/
│ │ │ ├── appInfo.ts
│ │ │ ├── backend.ts
│ │ │ └── frontend.tsx
│ │ ├── favicon.ico
│ │ ├── globals.css
│ │ ├── layout.tsx
│ │ ├── page.module.css
│ │ └── page.tsx
│ ├── assets/
│ │ ├── fonts/
│ │ │ └── MenloRegular.ttf
│ │ └── images/ [IGNORADO]
│ ├── public/ [IGNORADO]
│ ├── .gitignore [IGNORADO]
│ ├── middleware.ts
│ ├── next.config.js
│ ├── package.json
│ ├── README.md
│ └── tsconfig.json
├── with-temporal/
│ ├── components/
│ │ └── Layout.tsx
│ ├── pages/
│ │ ├── api/
│ │ │ └── orders/
│ │ │ └── index.ts
│ │ ├── about.tsx
│ │ └── index.tsx
│ ├── temporal/
│ │ ├── src/
│ │ │ ├── activities.ts
│ │ │ ├── worker.ts
│ │ │ └── workflows.ts
│ │ ├── package.json
│ │ └── tsconfig.json
│ ├── .gitignore [IGNORADO]
│ ├── .nvmrc
│ ├── package.json
│ ├── README.md
│ └── tsconfig.json
├── with-three-js/
│ ├── app/
│ │ ├── \_components/
│ │ │ ├── Bird.js
│ │ │ └── Box.js
│ │ ├── birds/
│ │ │ └── page.tsx
│ │ ├── boxes/
│ │ │ └── page.tsx
│ │ ├── layout.tsx
│ │ └── page.tsx
│ ├── public/ [IGNORADO]
│ ├── styles/
│ │ └── index.css
│ ├── .gitignore [IGNORADO]
│ ├── package.json
│ ├── README.md
│ └── tsconfig.json
├── with-tigris/
│ ├── components/
│ │ ├── EachToDo.tsx
│ │ └── LoaderWave.tsx
│ ├── db/
│ │ └── models/
│ │ └── todoItems.ts
│ ├── lib/
│ │ └── tigris.ts
│ ├── pages/
│ │ ├── api/
│ │ │ ├── item/
│ │ │ │ └── [id].ts
│ │ │ └── items/
│ │ │ ├── index.ts
│ │ │ └── search.ts
│ │ ├── \_app.tsx
│ │ └── index.tsx
│ ├── public/ [IGNORADO]
│ ├── scripts/
│ │ └── setup.ts
│ ├── styles/
│ │ ├── EachToDo.module.css
│ │ ├── globals.css
│ │ ├── Home.module.css
│ │ └── LoaderWave.module.css
│ ├── .env.development
│ ├── .env.local.example
│ ├── .env.production
│ ├── .gitignore [IGNORADO]
│ ├── package.json
│ ├── README.md
│ └── tsconfig.json
├── with-turbopack/
│ ├── app/
│ │ ├── layout.tsx
│ │ └── page.tsx
│ ├── .gitignore [IGNORADO]
│ ├── package.json
│ ├── README.md
│ └── tsconfig.json
├── with-turbopack-loaders/
│ ├── pages/
│ │ └── index.js
│ ├── .gitignore [IGNORADO]
│ ├── next.config.js
│ ├── package.json
│ ├── README.md
│ ├── styles.styl
│ └── vercel.react.svg
├── with-turso/
│ ├── app/
│ │ ├── actions.ts
│ │ ├── favicon.ico
│ │ ├── form.tsx
│ │ ├── globals.css
│ │ ├── layout.tsx
│ │ ├── page.tsx
│ │ ├── todo-list.tsx
│ │ └── todo.tsx
│ ├── lib/
│ │ └── turso.ts
│ ├── .env.example
│ ├── .gitignore [IGNORADO]
│ ├── next.config.mjs
│ ├── package.json
│ ├── postcss.config.js
│ ├── README.md
│ ├── tailwind.config.ts
│ └── tsconfig.json
├── with-typescript/
│ ├── components/
│ │ ├── Layout.tsx
│ │ ├── List.tsx
│ │ ├── ListDetail.tsx
│ │ └── ListItem.tsx
│ ├── interfaces/
│ │ └── index.ts
│ ├── pages/
│ │ ├── api/
│ │ │ └── users/
│ │ │ └── index.ts
│ │ ├── users/
│ │ │ ├── [id].tsx
│ │ │ └── index.tsx
│ │ ├── about.tsx
│ │ └── index.tsx
│ ├── utils/
│ │ └── sample-data.ts
│ ├── .gitignore [IGNORADO]
│ ├── package.json
│ ├── README.md
│ └── tsconfig.json
├── with-typescript-graphql/
│ ├── lib/
│ │ ├── gql/
│ │ │ ├── fragment-masking.ts
│ │ │ ├── gql.ts
│ │ │ ├── graphql.ts
│ │ │ └── index.ts
│ │ ├── apollo.ts
│ │ ├── resolvers.ts
│ │ └── schema.ts
│ ├── pages/
│ │ ├── api/
│ │ │ └── graphql.ts
│ │ ├── \_app.tsx
│ │ ├── about.tsx
│ │ └── index.tsx
│ ├── test/
│ │ ├── **snapshots**/
│ │ │ └── index.test.tsx.snap
│ │ └── index.test.tsx
│ ├── .gitignore [IGNORADO]
│ ├── codegen.ts
│ ├── jest.config.js
│ ├── next.config.js
│ ├── package.json
│ ├── README.md
│ └── tsconfig.json
├── with-typescript-types/
│ ├── pages/
│ │ └── index.tsx
│ ├── types/
│ │ ├── index.ts
│ │ └── package-1.ts
│ ├── .gitignore [IGNORADO]
│ ├── package.json
│ ├── README.md
│ └── tsconfig.json
├── with-unsplash/
│ ├── components/
│ │ ├── Collections/
│ │ │ ├── Collections.module.css
│ │ │ └── index.tsx
│ │ ├── Gallery/
│ │ │ ├── Gallery.module.css
│ │ │ └── index.tsx
│ │ ├── Layout/
│ │ │ ├── index.tsx
│ │ │ └── layout.module.css
│ │ ├── Social/
│ │ │ ├── index.tsx
│ │ │ └── Social.module.css
│ │ ├── Stats/
│ │ │ ├── index.tsx
│ │ │ └── Stats.module.css
│ │ ├── UIcon/
│ │ │ ├── index.tsx
│ │ │ └── UIcon.module.css
│ │ ├── UImage/
│ │ │ ├── index.tsx
│ │ │ └── UImage.module.css
│ │ └── User/
│ │ ├── index.tsx
│ │ └── User.module.css
│ ├── docs/ [IGNORADO]
│ ├── libs/
│ │ ├── fetcher.tsx
│ │ └── slug.tsx
│ ├── pages/
│ │ ├── api/
│ │ │ ├── collection/
│ │ │ │ ├── [id].tsx
│ │ │ │ └── index.tsx
│ │ │ ├── photo/
│ │ │ │ ├── download/
│ │ │ │ │ └── [id].tsx
│ │ │ │ ├── [id].tsx
│ │ │ │ └── index.tsx
│ │ │ ├── stats/
│ │ │ │ └── index.tsx
│ │ │ └── user/
│ │ │ └── index.tsx
│ │ ├── collection/
│ │ │ └── [slug].tsx
│ │ ├── \_app.js
│ │ ├── \_document.tsx
│ │ └── index.tsx
│ ├── public/ [IGNORADO]
│ ├── styles/
│ │ └── global.css
│ ├── .env.local.example
│ ├── .gitignore [IGNORADO]
│ ├── package.json
│ ├── README.md
│ └── tsconfig.json
├── with-urql/
│ ├── app/
│ │ ├── pokemon/
│ │ │ └── [name]/
│ │ │ └── page.tsx
│ │ ├── layout.tsx
│ │ └── page.tsx
│ ├── graphql/
│ │ ├── client.js
│ │ ├── getPokemon.js
│ │ └── getPokemons.js
│ ├── .gitignore [IGNORADO]
│ ├── package.json
│ ├── README.md
│ └── tsconfig.json
├── with-userbase/
│ ├── components/
│ │ ├── layout/
│ │ │ └── index.js
│ │ ├── modal/
│ │ │ └── index.js
│ │ ├── nav/
│ │ │ └── index.js
│ │ └── todo-form/
│ │ └── index.js
│ ├── pages/
│ │ ├── \_app.js
│ │ └── index.js
│ ├── styles/
│ │ ├── button.css
│ │ └── index.css
│ ├── .env.local.example
│ ├── .gitignore [IGNORADO]
│ ├── package.json
│ ├── postcss.config.js
│ ├── README.md
│ └── tailwind.config.js
├── with-vanilla-extract/
│ ├── app/
│ │ ├── globalStyle.css.ts
│ │ ├── layout.tsx
│ │ ├── page.css.ts
│ │ └── page.tsx
│ ├── components/
│ │ ├── Button.css.ts
│ │ ├── Button.tsx
│ │ ├── Footer.css.ts
│ │ ├── Footer.tsx
│ │ ├── Logo.css.ts
│ │ └── Logo.tsx
│ ├── public/ [IGNORADO]
│ ├── .gitignore [IGNORADO]
│ ├── next.config.js
│ ├── package.json
│ ├── README.md
│ └── tsconfig.json
├── with-videojs/
│ ├── app/
│ │ ├── \_components/
│ │ │ ├── Player.tsx
│ │ │ └── PlayerCss.tsx
│ │ ├── layout.tsx
│ │ └── page.tsx
│ ├── .gitignore [IGNORADO]
│ ├── package.json
│ ├── README.md
│ ├── tsconfig.json
│ └── videojs.d.ts
├── with-vitest/
│ ├── **tests**/
│ │ └── Home.test.tsx
│ ├── app/
│ │ ├── blog/
│ │ │ └── [slug]/
│ │ │ ├── page.test.tsx
│ │ │ └── page.tsx
│ │ ├── utils/
│ │ │ ├── add.test.ts
│ │ │ └── add.ts
│ │ ├── counter.test.tsx
│ │ ├── counter.tsx
│ │ ├── layout.tsx
│ │ ├── page.test.tsx
│ │ └── page.tsx
│ ├── pages/
│ │ ├── home/
│ │ │ └── index.tsx
│ │ └── \_app.tsx
│ ├── public/ [IGNORADO]
│ ├── styles/
│ │ ├── globals.css
│ │ └── Home.module.css
│ ├── .gitignore [IGNORADO]
│ ├── package.json
│ ├── README.md
│ ├── tsconfig.json
│ └── vitest.config.ts
├── with-web-worker/
│ ├── app/
│ │ ├── layout.tsx
│ │ └── page.tsx
│ ├── utils/
│ │ └── pi.ts
│ ├── .gitignore [IGNORADO]
│ ├── package.json
│ ├── README.md
│ ├── tsconfig.json
│ └── worker.ts
├── with-webassembly/
│ ├── app/
│ │ ├── api/
│ │ │ └── edge/
│ │ │ └── route.ts
│ │ ├── layout.tsx
│ │ └── page.tsx
│ ├── components/
│ │ └── RustComponent.tsx
│ ├── src/
│ │ └── add.rs
│ ├── .gitignore [IGNORADO]
│ ├── add.wasm
│ ├── add.wasm.d.ts
│ ├── next.config.js
│ ├── package.json
│ ├── README.md
│ └── tsconfig.json
├── with-windicss/
│ ├── app/
│ │ ├── layout.tsx
│ │ └── page.tsx
│ ├── public/ [IGNORADO]
│ ├── styles/
│ │ └── globals.css
│ ├── .gitignore [IGNORADO]
│ ├── next.config.js
│ ├── package.json
│ ├── README.md
│ ├── tsconfig.json
│ └── windi.config.ts
├── with-xata/
│ ├── pages/
│ │ ├── api/
│ │ │ ├── clean-xata.ts
│ │ │ └── write-links-to-xata.ts
│ │ ├── \_app.tsx
│ │ └── index.tsx
│ ├── public/ [IGNORADO]
│ ├── styles/
│ │ └── root.css
│ ├── utils/
│ │ └── xata.codegen.ts
│ ├── .gitignore [IGNORADO]
│ ├── package.json
│ ├── README.md
│ ├── schema.template.json
│ └── tsconfig.json
├── with-xstate/
│ ├── app/
│ │ ├── \_components/
│ │ │ ├── Counter.tsx
│ │ │ └── Toggle.tsx
│ │ ├── \_machines/
│ │ │ ├── counter.ts
│ │ │ └── toggle.ts
│ │ ├── layout.tsx
│ │ └── page.tsx
│ ├── .gitignore [IGNORADO]
│ ├── package.json
│ ├── README.md
│ └── tsconfig.json
├── with-yarn-workspaces/
│ ├── packages/
│ │ ├── bar/
│ │ │ ├── index.js
│ │ │ └── package.json
│ │ ├── foo/
│ │ │ ├── index.js
│ │ │ └── package.json
│ │ └── web-app/
│ │ ├── pages/
│ │ │ ├── api/
│ │ │ │ └── echo/
│ │ │ │ └── [word].js
│ │ │ └── index.js
│ │ ├── next.config.js
│ │ └── package.json
│ ├── .gitignore [IGNORADO]
│ ├── package.json
│ └── README.md
├── with-yoga/
│ ├── pages/
│ │ ├── \_app.tsx
│ │ └── index.tsx
│ ├── .gitignore [IGNORADO]
│ ├── next.config.js
│ ├── package.json
│ ├── README.md
│ ├── tsconfig.json
│ └── yoga.d.ts
├── with-youtube-embed/
│ ├── app/
│ │ ├── layout.tsx
│ │ └── page.tsx
│ ├── .gitignore [IGNORADO]
│ ├── package.json
│ ├── README.md
│ └── tsconfig.json
├── with-zones/
│ ├── blog/
│ │ ├── app/
│ │ │ └── blog/
│ │ │ ├── post/
│ │ │ │ └── [id]/
│ │ │ │ └── page.tsx
│ │ │ ├── layout.tsx
│ │ │ └── page.tsx
│ │ ├── next.config.js
│ │ ├── package.json
│ │ └── tsconfig.json
│ ├── docs/ [IGNORADO]
│ ├── home/
│ │ ├── app/
│ │ │ ├── about/
│ │ │ │ └── page.tsx
│ │ │ ├── layout.tsx
│ │ │ └── page.tsx
│ │ ├── components/
│ │ │ └── Header.tsx
│ │ ├── test/
│ │ │ └── next-config.test.ts
│ │ ├── .env [IGNORADO]
│ │ ├── jest.config.js
│ │ ├── next.config.js
│ │ ├── package.json
│ │ └── tsconfig.json
│ ├── .gitignore [IGNORADO]
│ ├── package.json
│ └── README.md
├── with-zustand/
│ ├── public/ [IGNORADO]
│ ├── src/
│ │ ├── app/
│ │ │ ├── layout.tsx
│ │ │ └── page.tsx
│ │ ├── components/
│ │ │ ├── clock.css
│ │ │ ├── clock.tsx
│ │ │ └── counter.tsx
│ │ └── lib/
│ │ ├── store.ts
│ │ ├── StoreProvider.tsx
│ │ └── useInterval.ts
│ ├── .gitignore [IGNORADO]
│ ├── package.json
│ ├── README.md
│ └── tsconfig.json
└── .prettierrc.json
====================================================================
