const { existsSync, readFileSync } = require('fs')
const { join } = require('path')
const { createClient } = require('@supabase/supabase-js')

function loadEnvFile(fileName) {
  const filePath = join(process.cwd(), fileName)

  if (!existsSync(filePath)) {
    return
  }

  const lines = readFileSync(filePath, 'utf8').split(/\r?\n/)

  for (const line of lines) {
    const trimmed = line.trim()

    if (!trimmed || trimmed.startsWith('#')) {
      continue
    }

    const separatorIndex = trimmed.indexOf('=')

    if (separatorIndex === -1) {
      continue
    }

    const key = trimmed.slice(0, separatorIndex).trim()
    const value = trimmed.slice(separatorIndex + 1).trim().replace(/^["']|["']$/g, '')

    if (key && !process.env[key]) {
      process.env[key] = value
    }
  }
}

loadEnvFile('.env.local')
loadEnvFile('.env')

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !serviceRoleKey) {
  console.error('Missing Supabase env vars. Add NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY to .env.local.')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
})

const tables = ['leads', 'visits', 'automation_workflows', 'automation_logs', 'jobs', 'messages']

async function checkTables() {
  const results = await Promise.all(
    tables.map(async (table) => {
      const { error } = await supabase.from(table).select('*').limit(1)

      return {
        table,
        ok: !error,
        error: error?.message,
      }
    })
  )

  let hasError = false

  for (const result of results) {
    if (result.ok) {
      console.log(`OK ${result.table}`)
    } else {
      hasError = true
      console.error(`FAIL ${result.table}: ${result.error}`)
    }
  }

  if (hasError) {
    process.exit(1)
  }

  console.log('Supabase connection looks ready.')
}

checkTables().catch((error) => {
  console.error('Supabase check failed:', error.message)
  process.exit(1)
})
