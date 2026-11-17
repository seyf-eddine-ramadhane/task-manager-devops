
pipeline {
    agent any

    tools {
        nodejs 'Node22'
    }

    triggers {
        pollSCM('H/2 * * * *')
    }

    stages {

        stage('Build') {
            steps {
                echo 'Installing dependencies...'
                sh 'npm ci'
            }
        }

        stage('Test') {
            steps {
                echo 'Running automated tests and generating JUnit report...'

                script {
                    def testStatus = sh(
                        script: 'npm run test:junit',
                        returnStatus: true
                    )

                    junit(
                        testResults: 'test-results.xml',
                        allowEmptyResults: false
                    )

                    if (testStatus != 0) {
                        error('Automated tests failed!')
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying application to Netlify...'

                withCredentials([
                    string(
                        credentialsId: 'netlify-token',
                        variable: 'NETLIFY_AUTH_TOKEN'
                    ),
                    string(
                        credentialsId: 'netlify-site-id',
                        variable: 'NETLIFY_SITE_ID'
                    )
                ]) {
                    sh '''
                        npx --yes netlify-cli deploy \
                        --prod \
                        --dir=public \
                        --site="$NETLIFY_SITE_ID" \
                        --auth="$NETLIFY_AUTH_TOKEN"
                    '''
                }
            }
        }
    }

    post {
        success {
            echo 'SUCCESS: Application deployed!'
        }

        failure {
            echo 'ERROR: Pipeline failed!'
        }
    }
}
