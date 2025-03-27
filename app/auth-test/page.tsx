'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { supabase } from '@/lib/supabase'

export default function AuthTestPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  async function testSignUp() {
    setLoading(true)
    setResult(null)
    
    try {
      console.log('Direct sign-up test:', { email, password })
      
      const response = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`
        }
      })
      
      setResult({
        success: !response.error,
        data: response.data,
        error: response.error,
        timestamp: new Date().toISOString()
      })
      
      console.log('Direct sign-up result:', response)
    } catch (error) {
      console.error('Test sign-up error:', error)
      setResult({
        success: false,
        error,
        timestamp: new Date().toISOString()
      })
    } finally {
      setLoading(false)
    }
  }

  async function testGetUser() {
    setLoading(true)
    setResult(null)
    
    try {
      const { data } = await supabase.auth.getUser()
      setResult({
        user: data.user,
        timestamp: new Date().toISOString()
      })
      console.log('Current user:', data.user)
    } catch (error) {
      console.error('Get user error:', error)
      setResult({
        success: false,
        error,
        timestamp: new Date().toISOString()
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-12 max-w-md">
      <h1 className="text-3xl font-bold mb-8">Supabase Auth Debug</h1>
      
      <div className="space-y-6 bg-zinc-900 p-6 rounded-lg">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="test-email">Email</Label>
            <Input
              id="test-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="test@example.com"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="test-password">Password</Label>
            <Input
              id="test-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
            />
          </div>
          
          <div className="space-y-2 pt-2 flex gap-4">
            <Button 
              onClick={testSignUp}
              disabled={loading || !email || !password}
              className="bg-zinc-200 text-zinc-900 hover:bg-zinc-300"
            >
              {loading ? 'Testing...' : 'Test Sign Up'}
            </Button>
            
            <Button 
              onClick={testGetUser}
              disabled={loading}
              variant="outline"
            >
              Get Current User
            </Button>
          </div>
        </div>
        
        {result && (
          <div className="mt-6">
            <h3 className="text-lg font-medium mb-2">Result:</h3>
            <div className="bg-zinc-950 p-4 rounded-md overflow-auto max-h-80">
              <pre className="text-xs text-zinc-300">
                {JSON.stringify(result, null, 2)}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 