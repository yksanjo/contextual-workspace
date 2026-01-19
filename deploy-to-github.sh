#!/bin/bash
# Deploy script for contextual-workspace project

set -e

# Check if GitHub username is provided
if [ -z "$1" ]; then
    echo "❌ Error: GitHub username is required"
    echo "Usage: ./deploy-to-github.sh YOUR_GITHUB_USERNAME"
    exit 1
fi

GITHUB_USER="$1"
PROJECT_NAME="contextual-workspace"

echo "🚀 Deploying $PROJECT_NAME to GitHub..."
echo "GitHub Username: $GITHUB_USER"
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Make sure you're in the project directory."
    exit 1
fi

# Initialize git if not already initialized
if [ ! -d ".git" ]; then
    echo "📦 Initializing git repository..."
    git init
    echo "✓ Git repository initialized"
fi

# Add all files
echo "📝 Adding files to git..."
git add .
echo "✓ Files added"

# Create initial commit if needed
if ! git rev-parse --verify HEAD >/dev/null 2>&1; then
    echo "💾 Creating initial commit..."
    git commit -m "Initial commit: $PROJECT_NAME

- Next.js project with TypeScript
- Tailwind CSS for styling
- Prisma for database
- NextAuth for authentication
- Stripe integration
- React Query for data fetching"
    echo "✓ Initial commit created"
else
    echo "ℹ Repository already has commits"
fi

# Check current remote
CURRENT_REMOTE=$(git remote get-url origin 2>/dev/null || echo "")
if [ -n "$CURRENT_REMOTE" ]; then
    echo "ℹ Current remote: $CURRENT_REMOTE"
    echo "⚠ Warning: Remote already exists. Do you want to change it? (y/n)"
    read -r response
    if [[ "$response" =~ ^([yY][eE][sS]|[yY])$ ]]; then
        git remote remove origin
        echo "✓ Old remote removed"
    else
        echo "ℹ Keeping existing remote"
    fi
fi

# Add new remote if not exists
if ! git remote | grep -q origin; then
    echo "🔗 Adding remote origin..."
    git remote add origin "https://github.com/$GITHUB_USER/$PROJECT_NAME.git"
    echo "✓ Remote added: https://github.com/$GITHUB_USER/$PROJECT_NAME.git"
fi

# Set main branch
echo "🌿 Setting main branch..."
git branch -M main 2>/dev/null || true
echo "✓ Main branch set"

# Push to GitHub
echo "📤 Pushing to GitHub..."
echo "Repository URL: https://github.com/$GITHUB_USER/$PROJECT_NAME"
echo ""

if git push -u origin main 2>&1 | grep -q "remote: Repository not found"; then
    echo "⚠ Repository not found on GitHub."
    echo ""
    echo "📝 Please create the repository first:"
    echo "   1. Go to: https://github.com/new"
    echo "   2. Set repository name to: $PROJECT_NAME"
    echo "   3. Make it public or private as desired"
    echo "   4. DO NOT initialize with README, .gitignore, or license"
    echo "   5. Click 'Create repository'"
    echo ""
    echo "After creating the repository, run this script again."
    echo ""
    echo "📋 Or create it via command line (requires GitHub CLI):"
    echo "   gh repo create $GITHUB_USER/$PROJECT_NAME --public --source=. --remote=origin --push"
else
    echo "✅ Successfully pushed to GitHub!"
    echo ""
    echo "🌐 Your repository is now available at:"
    echo "   https://github.com/$GITHUB_USER/$PROJECT_NAME"
fi

echo ""
echo "🎉 Deployment complete!"