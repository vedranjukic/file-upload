import { Daytona } from '@daytonaio/sdk'

async function main() {
  const daytona = new Daytona({
    apiKey: 'ADD-YOUR-API-KEY-HERE',
    apiUrl: 'https://app.daytona.io/api',
    organizationId: 'ADD-YOUR-ORG-ID-HERE',
    target: 'eu' as 'eu' | 'us',
  })

  const sandbox2 = await daytona.create({
    language: 'typescript',
    resources: {
      cpu: 2,
      memory: 4,
      disk: 5,
    },
    image: 'niraliaandani/expo-repo:0.0.11',
    autoStopInterval: 120,
    public: true,
  })

  console.log('Sandbox 2:', sandbox2)

  let dir: string | undefined = ''
  try {
    dir = await sandbox2.getUserRootDir()
    console.log('Sandbox 2 user directory:', dir)
  } catch (error) {
    console.error('Error getting sandbox 2 root dir:', error)
  }

  const filePathWithDir = `${dir}/test.tsx`

  console.log('file path, content type, content length => ', filePathWithDir)

  const contentBuffer = Buffer.from(
    'export default function Home() { return <View><Text>Hello World</Text></View> }',
    'utf-8'
  )
  const fileContent = new File([contentBuffer], filePathWithDir, { type: 'application/typescript' })

  console.log('uploading file')
  try {
    await sandbox2.fs.uploadFile(filePathWithDir, fileContent)
  } catch (error) {
    console.error('error uploading file', error)
  }
}

main()
