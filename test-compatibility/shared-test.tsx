import React, { useState } from 'react'
import Picker from 'react-mobile-picker'

const selections = {
  title: ['Mr.', 'Mrs.', 'Ms.', 'Dr.'],
  firstName: ['John', 'Micheal', 'Elizabeth'],
  lastName: ['Lennon', 'Jackson', 'Jordan', 'Legend', 'Taylor']
}

export function TestApp() {
  const [pickerValue, setPickerValue] = useState({
    title: 'Mr.',
    firstName: 'Micheal',
    lastName: 'Jordan'
  })

  const [error, setError] = useState<string | null>(null)

  // Wrap in error boundary
  React.useEffect(() => {
    window.addEventListener('error', (e) => {
      setError(e.message)
    })
    window.addEventListener('unhandledrejection', (e) => {
      setError(e.reason?.message || 'Unhandled rejection')
    })
  }, [])

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>React {React.version} Compatibility Test</h1>
      
      {error ? (
        <div style={{ 
          background: '#ffebee', 
          border: '1px solid #f44336', 
          padding: '10px', 
          borderRadius: '4px',
          marginBottom: '20px' 
        }}>
          <h3 style={{ color: '#d32f2f' }}>❌ Error Detected:</h3>
          <pre style={{ whiteSpace: 'pre-wrap' }}>{error}</pre>
        </div>
      ) : (
        <div style={{ 
          background: '#e8f5e9', 
          border: '1px solid #4caf50', 
          padding: '10px', 
          borderRadius: '4px',
          marginBottom: '20px' 
        }}>
          <h3 style={{ color: '#388e3c' }}>✅ No Errors - Component Working!</h3>
        </div>
      )}

      <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '20px' }}>
        <h3>Picker Component:</h3>
        <Picker value={pickerValue} onChange={setPickerValue} height={200}>
          {Object.keys(selections).map(name => (
            <Picker.Column key={name} name={name}>
              {(selections as any)[name].map((option: string) => (
                <Picker.Item key={option} value={option}>
                  {({ selected }) => (
                    <div style={{ 
                      color: selected ? '#1976d2' : '#666',
                      fontWeight: selected ? 'bold' : 'normal'
                    }}>
                      {option}
                    </div>
                  )}
                </Picker.Item>
              ))}
            </Picker.Column>
          ))}
        </Picker>
      </div>

      <div style={{ marginTop: '20px', padding: '10px', background: '#f5f5f5', borderRadius: '4px' }}>
        <strong>Selected values:</strong>
        <pre>{JSON.stringify(pickerValue, null, 2)}</pre>
      </div>

      <div style={{ marginTop: '20px', fontSize: '12px', color: '#666' }}>
        <p>Library version: react-mobile-picker@1.1.2</p>
        <p>React version: {React.version}</p>
        <p>Test timestamp: {new Date().toISOString()}</p>
      </div>
    </div>
  )
}