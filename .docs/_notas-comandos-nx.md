pnpm nx show projects

npx create-nx-workspace@latest razvolution

pnpm nx g @nx/react:lib shared/ui --tags="scope:shared,type:ui" --importPath="@revolution-supplements/shared/ui" --buildable --bundler=tsc

pnpm nx g @nx/js:lib shared/logging --tags="scope:shared,type:observability" --importPath="@razvolution/shared/logging" --buildable --bundler=tsc

pnpm nx g @nx/react:lib shared/ui --tags="scope:shared,type:ui" --importPath="@razvolution/shared/ui" --bundler=tsc --linter=eslint


pnpm add @razvolution/shared-supabase --filter @razvolution/features-auth


---

Please create a repo at https://github.com/new?name=revolution-smart-store and push this workspace.

NX Your CI setup is almost complete.

Push your repo, then go to Nx Cloud and finish the setup: https://cloud.nx.app/connect/d0Nd8AwtgZ
