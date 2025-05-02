pipeline {
    agent any

    triggers {
        githubPush()
    }

    stages {
        stage('Checkout') {
            steps {
                git url: 'https://github.com/MoeOuni/todo-app-express.git', branch: 'main'
            }
        }
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        stage('Run Tests') {
            steps {
                sh 'npm test'
            }
        }
        stage('Build and Deploy') {
            steps {
                script {
                    // Stop and remove the running container if it exists
                    sh '''
                    if [ "$(docker ps -q -f name=todo-app)" ]; then
                        echo "Stopping and removing existing container..."
                        docker stop todo-app
                        docker rm todo-app
                    fi
                    '''
                    // Build the Docker image
                    sh 'docker build -t todo-app .'

                    // Run the new container with a given name so it can be easily referenced later
                    sh 'docker run -d --name todo-app -p 3000:3000 todo-app'
                }
            }
        }
    }
    post {
        failure {
            echo "Deployment failed."
        }
        success {
            echo "Deployed successfully."
        }
    }
}