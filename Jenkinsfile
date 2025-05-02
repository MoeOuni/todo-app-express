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
                    // Stop any running containers and build/start with docker-compose
                    sh '''
                    docker-compose down || true
                    docker-compose up --build -d
                    '''
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