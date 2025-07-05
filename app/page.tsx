export default function GitHubSyncGuide() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">GitHub Sync Setup Guide</h1>
        <p className="text-xl text-muted-foreground">
          Connect your project to GitHub for seamless deployment and collaboration
        </p>
      </div>

      <div className="grid gap-8">
        {/* Step 1: Initialize Git Repository */}
        <div className="border rounded-lg p-6 space-y-4">
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm">
              1
            </span>
            Initialize Git Repository
          </h2>
          <div className="space-y-3">
            <p className="text-muted-foreground">First, initialize your project as a Git repository:</p>
            <div className="bg-gray-100 p-4 rounded-md font-mono text-sm">
              <div>git init</div>
              <div>git add .</div>
              <div>git commit -m "Initial commit"</div>
            </div>
          </div>
        </div>

        {/* Step 2: Create GitHub Repository */}
        <div className="border rounded-lg p-6 space-y-4">
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm">
              2
            </span>
            Create GitHub Repository
          </h2>
          <div className="space-y-3">
            <p className="text-muted-foreground">Create a new repository on GitHub and connect it:</p>
            <div className="bg-gray-100 p-4 rounded-md font-mono text-sm">
              <div>git remote add origin https://github.com/username/repository-name.git</div>
              <div>git branch -M main</div>
              <div>git push -u origin main</div>
            </div>
          </div>
        </div>

        {/* Step 3: Vercel Deployment */}
        <div className="border rounded-lg p-6 space-y-4">
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <span className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm">
              3
            </span>
            Deploy to Vercel
          </h2>
          <div className="space-y-3">
            <p className="text-muted-foreground">Connect your GitHub repository to Vercel for automatic deployments:</p>
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li>
                Go to{" "}
                <a href="https://vercel.com" className="text-blue-500 hover:underline">
                  vercel.com
                </a>{" "}
                and sign in with GitHub
              </li>
              <li>Click "New Project" and import your GitHub repository</li>
              <li>Configure your build settings (usually auto-detected for Next.js)</li>
              <li>Deploy your project</li>
            </ul>
          </div>
        </div>

        {/* Step 4: Supabase Branching */}
        <div className="border rounded-lg p-6 space-y-4">
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <span className="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm">
              4
            </span>
            Supabase Branching (Optional)
          </h2>
          <div className="space-y-3">
            <p className="text-muted-foreground">If using Supabase, set up branching for database migrations:</p>
            <div className="bg-gray-100 p-4 rounded-md font-mono text-sm space-y-1">
              <div># Initialize Supabase in your project</div>
              <div>supabase init</div>
              <div></div>
              <div># Pull existing database schema</div>
              <div>supabase db pull --db-url your_connection_string</div>
              <div></div>
              <div># Commit Supabase directory</div>
              <div>git add supabase/</div>
              <div>git commit -m "Add Supabase configuration"</div>
              <div>git push</div>
            </div>
          </div>
        </div>

        {/* Step 5: Development Workflow */}
        <div className="border rounded-lg p-6 space-y-4">
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <span className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm">
              5
            </span>
            Development Workflow
          </h2>
          <div className="space-y-3">
            <p className="text-muted-foreground">Follow this workflow for ongoing development:</p>
            <div className="bg-gray-100 p-4 rounded-md font-mono text-sm space-y-1">
              <div># Create feature branch</div>
              <div>git checkout -b feature/new-feature</div>
              <div></div>
              <div># Make changes and commit</div>
              <div>git add .</div>
              <div>git commit -m "Add new feature"</div>
              <div></div>
              <div># Push to GitHub</div>
              <div>git push origin feature/new-feature</div>
              <div></div>
              <div># Create Pull Request on GitHub</div>
              <div># Merge to main when ready</div>
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="border rounded-lg p-6 space-y-4">
          <h2 className="text-2xl font-semibold">Benefits of GitHub Sync</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h3 className="font-semibold text-green-600">Automatic Deployments</h3>
              <p className="text-sm text-muted-foreground">
                Every push to main triggers a production deployment on Vercel [^2]
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-blue-600">Preview Deployments</h3>
              <p className="text-sm text-muted-foreground">Pull requests get preview URLs for testing changes [^2]</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-purple-600">Database Branching</h3>
              <p className="text-sm text-muted-foreground">Test database changes safely with Supabase branches [^1]</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-orange-600">Collaboration</h3>
              <p className="text-sm text-muted-foreground">Team members can contribute via pull requests</p>
            </div>
          </div>
        </div>

        {/* Environment Variables */}
        <div className="border rounded-lg p-6 space-y-4">
          <h2 className="text-2xl font-semibold">Environment Variables</h2>
          <p className="text-muted-foreground">
            Set up environment variables in Vercel dashboard for production and preview deployments:
          </p>
          <div className="bg-gray-100 p-4 rounded-md font-mono text-sm space-y-1">
            <div>NEXT_PUBLIC_SUPABASE_URL=your_supabase_url</div>
            <div>NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key</div>
            <div>DATABASE_URL=your_database_url</div>
          </div>
        </div>
      </div>
    </div>
  )
}
