import { Box, Button, chakra, Flex, Stack, Text } from "@chakra-ui/react"
import { Project } from "../../interfaces/project.interface"
import { FaLeaf } from "react-icons/fa"
import TimeAgo from 'react-timeago'
import { useContext, useState } from "react"
import { translate } from "../../utils/language.utils"
import { useNavigate } from "react-router"
import { AuthContext } from "../../context/auth"
import RestoreProjectConfirmation from "../RestoreProjectConfirmation";

interface Props {
    project: Project
    onRestore: (projectId: string) => void
}

const LeafIcon = chakra(FaLeaf)
const TimeAgeComponent = chakra(TimeAgo)

export default function ProjectDeletedItem({ project, onRestore }: Props) {
    const [isRestoreConfirmationOpen, setIsRestoreConfirmationOpen] = useState(false)
    const navigate = useNavigate()
    const { context } = useContext(AuthContext)
    const userEmail = context?.user?.email

    const onRestoreAction = () => {
        setIsRestoreConfirmationOpen(false)
        onRestore(project.id)
    }

    return (
        <Box
            border='1px'
            borderColor='gray.500'
            p={6}
            rounded='lg'
            _hover={{
                transform: 'scale(1.05)',
                transition: 'all 0.2s ease-in-out'
            }}
        >
            <Stack spacing={5}>
                <Text textAlign='justify' noOfLines={5}>{project.description}</Text>
                <Flex alignItems='center' gap={2}>
                    <LeafIcon color={'green.500'} />
                    <Text fontWeight='bold' color='green.500'>{project.co2EstimateReduction[0]} - {project.co2EstimateReduction[1]} tons co2e.</Text>
                </Flex>
                {userEmail === project.owner && (
                  <Flex justifyContent='space-between' gap={4} alignItems='center'>
                      <Flex>
                          <Button size='sm' onClick={() => setIsRestoreConfirmationOpen(true)}>
                              {translate('RESTORE_PROJECT_CTA')}
                          </Button>
                      </Flex>
                  </Flex>
                )}
            </Stack>
            <RestoreProjectConfirmation
                isOpen={isRestoreConfirmationOpen}
                onClose={() => setIsRestoreConfirmationOpen(false)}
                onRestore={onRestoreAction}
            />
        </Box>
    )
}