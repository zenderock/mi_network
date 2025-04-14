const API_URL = process.env.NEXT_PUBLIC_API_URL

export const getFirewallRules = async () => {
  const response = await fetch(`${API_URL}/api/firewall/`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  })
  return await response.json()
}

export const addFirewallRule = async (rule: {
  protocol: string
  port: string
  action?: string
  source?: string
}) => {
  const response = await fetch(`${API_URL}/api/firewall`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify(rule)
  })
  return await response.json()
}

export const deleteFirewallRule = async (ruleId: string) => {
  const response = await fetch(`${API_URL}/api/firewall/${ruleId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  })
  return await response.json()
}