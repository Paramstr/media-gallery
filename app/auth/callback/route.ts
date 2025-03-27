import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  
  console.log('Auth callback triggered:', { 
    url: request.url,
    hasCode: !!code,
    time: new Date().toISOString()
  })

  if (code) {
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })
    
    try {
      const { data, error } = await supabase.auth.exchangeCodeForSession(code)
      
      console.log('Exchange code result:', {
        success: !error,
        error: error?.message,
        hasSession: !!data?.session,
        user: data?.session?.user?.email
      })
      
      if (error) {
        console.error('Error exchanging code for session:', error)
        return NextResponse.redirect(
          `${requestUrl.origin}/auth-error?error=${encodeURIComponent(error.message)}`
        )
      }
    } catch (error) {
      console.error('Unexpected error in auth callback:', error)
      return NextResponse.redirect(
        `${requestUrl.origin}/auth-error?error=Unexpected_error`
      )
    }
  }

  // URL to redirect to after sign in process completes
  return NextResponse.redirect(requestUrl.origin)
} 