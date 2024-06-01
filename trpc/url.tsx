export function getBaseUrl() {
  console.log('process.env.NEXT_PUBLIC_VERCEL_BRANCH_URL', process.env.NEXT_PUBLIC_VERCEL_BRANCH_URL)
  console.log('process.env.NEXT_PUBLIC_VERCEL_URL', process.env.NEXT_PUBLIC_VERCEL_URL)
  console.log('process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL', process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL)
  console.log('process.env.VERCEL_URL', process.env.VERCEL_URL)
  //process.env.VERCEL_URLがセットされている場合は、そのURLを返す
  if (process.env.NEXT_PUBLIC_VERCEL_BRANCH_URL) return `https://${process.env.NEXT_PUBLIC_VERCEL_BRANCH_URL}`;
  if (process.env.NEXT_PUBLIC_VERCEL_URL) return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
  if (process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL) return `https://${process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL}`;
  //それ以外の場合は、ローカルのURLを返す
  return `${process.env.NEXT_PUBLIC_APP_URL}`;
}