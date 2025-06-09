import React, { useState } from 'react';
import { 
  Button, 
  TextField, 
  Typography, 
  Card, 
  CardContent, 
  Box, 
  Chip,
  Container,
  Stack,
  Paper,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { pageConst } from '@/constant/pageConst';

interface Step0Props {
  onSelectTripType: (themes: string[], description: string, isInternational: boolean) => void;
  onBack?: () => void;
}

const Step0_TripTypeSelection = ({ onSelectTripType, onBack }: Step0Props) => {
  const [selectedThemes, setSelectedThemes] = useState<string[]>([]);
  const [description, setDescription] = useState('');
  const [isInternational, setIsInternational] = useState(false);
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  // 디버깅을 위한 로그
  console.log('Step0 컴포넌트 렌더링, tripThemes 길이:', pageConst.tripThemes?.length);

  const handleThemeChange = (themeId: string) => {
    setSelectedThemes(prev => 
      prev.includes(themeId)
        ? prev.filter(id => id !== themeId)
        : [...prev, themeId]
    );
  };

  const handleSubmit = () => {
    if (selectedThemes.length > 0) {
      onSelectTripType(selectedThemes, description, isInternational);
    }
  };

  const getSelectedThemeNames = () => {
    return selectedThemes.map(id => 
      pageConst.tripThemes.find(theme => theme.id === id)?.name
    ).filter(Boolean).join(', ');
  };

  return (
    <Box sx={{ 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      height: '100%',
      overflow: 'hidden',
      py: { xs: 2, sm: 3, md: 4 },
      px: { xs: 1, sm: 2 }
    }}>
      <Container maxWidth="lg" sx={{ height: '100%' }}>
        <Paper 
          elevation={24}
          sx={{ 
            borderRadius: { xs: '16px', md: '24px' },
            overflow: 'hidden',
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            height: '100%',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Box sx={{ 
            p: { xs: 2, sm: 3, md: 4, lg: 5 },
            height: '100%',
            overflow: 'auto',
            '&::-webkit-scrollbar': {
              width: '8px',
            },
            '&::-webkit-scrollbar-track': {
              background: 'rgba(0,0,0,0.1)',
              borderRadius: '4px',
            },
            '&::-webkit-scrollbar-thumb': {
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: '4px',
            },
            '&::-webkit-scrollbar-thumb:hover': {
              background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
            }
          }}>
            {/* 헤더 섹션 */}
            <Stack spacing={3} alignItems="center" sx={{ mb: 4 }}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography 
                  variant={isMobile ? "h4" : "h3"} 
                  sx={{ 
                    fontWeight: 900,
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    mb: 1,
                    letterSpacing: '-0.02em'
                  }}
                >
                  ✈️ 여행 테마 선택
                </Typography>
                <Typography 
                  variant="h6" 
                  color="text.secondary" 
                  sx={{ 
                    fontSize: { xs: '1rem', md: '1.25rem' },
                    fontWeight: 400
                  }}
                >
                  원하는 여행 스타일을 선택해주세요 (복수 선택 가능)
                </Typography>
              </Box>

              {/* 국내/해외 토글 버튼 */}
              <Paper 
                elevation={2}
                sx={{ 
                  p: 0.5, 
                  borderRadius: '50px',
                  background: 'rgba(102, 126, 234, 0.1)',
                  border: '1px solid rgba(102, 126, 234, 0.2)'
                }}
              >
                <Stack direction="row" spacing={0}>
                  <Button
                    variant={!isInternational ? "contained" : "text"}
                    onClick={() => setIsInternational(false)}
                    sx={{ 
                      px: { xs: 2, md: 3 }, 
                      py: 1,
                      borderRadius: '50px',
                      fontWeight: 'bold',
                      minWidth: { xs: '100px', md: '130px' },
                      background: !isInternational 
                        ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
                        : 'transparent',
                      color: !isInternational ? 'white' : '#667eea',
                      '&:hover': {
                        background: !isInternational 
                          ? 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)' 
                          : 'rgba(102, 126, 234, 0.1)'
                      }
                    }}
                  >
                    🇰🇷 국내 여행
                  </Button>
                  <Button
                    variant={isInternational ? "contained" : "text"}
                    onClick={() => setIsInternational(true)}
                    sx={{ 
                      px: { xs: 2, md: 3 }, 
                      py: 1,
                      borderRadius: '50px',
                      fontWeight: 'bold',
                      minWidth: { xs: '100px', md: '130px' },
                      background: isInternational 
                        ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
                        : 'transparent',
                      color: isInternational ? 'white' : '#667eea',
                      '&:hover': {
                        background: isInternational 
                          ? 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)' 
                          : 'rgba(102, 126, 234, 0.1)'
                      }
                    }}
                  >
                    🌍 해외 여행
                  </Button>
                </Stack>
              </Paper>
            </Stack>

            {/* 여행 테마 카드 섹션 */}
            <Box sx={{ mb: 4, flex: 1, minHeight: 0 }}>
              <Typography 
                variant="h5" 
                sx={{ 
                  mb: 3, 
                  fontWeight: 'bold', 
                  textAlign: 'center',
                  color: '#333'
                }}
              >
                🎯 여행 테마 ({selectedThemes.length}개 선택됨)
              </Typography>
              
              {/* 반응형 그리드 */}
              <Box sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: 'repeat(2, 1fr)',     // 모바일: 2열
                  sm: 'repeat(3, 1fr)',     // 태블릿: 3열  
                  md: 'repeat(4, 1fr)',     // 데스크톱: 4열
                  lg: 'repeat(4, 1fr)'      // 대형: 4열
                },
                gap: { xs: 1.5, sm: 2, md: 2.5 },
                maxHeight: { xs: '300px', sm: '400px', md: '350px' },
                overflow: 'auto',
                pr: 1,
                '&::-webkit-scrollbar': {
                  width: '6px',
                },
                '&::-webkit-scrollbar-track': {
                  background: 'rgba(0,0,0,0.05)',
                  borderRadius: '3px',
                },
                '&::-webkit-scrollbar-thumb': {
                  background: 'rgba(102, 126, 234, 0.3)',
                  borderRadius: '3px',
                },
                '&::-webkit-scrollbar-thumb:hover': {
                  background: 'rgba(102, 126, 234, 0.5)',
                }
              }}>
                {pageConst.tripThemes.map((themeItem) => {
                  const isSelected = selectedThemes.includes(themeItem.id);
                  
                  return (
                    <Card
                      key={themeItem.id}
                      sx={{
                        cursor: 'pointer',
                        height: { xs: '120px', sm: '140px', md: '160px' },
                        position: 'relative',
                        borderRadius: { xs: '12px', md: '16px' },
                        border: isSelected 
                          ? `3px solid ${themeItem.color}` 
                          : '2px solid transparent',
                        background: isSelected 
                          ? themeItem.gradient
                          : 'rgba(255, 255, 255, 0.9)',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        transform: isSelected ? 'scale(1.02)' : 'scale(1)',
                        boxShadow: isSelected 
                          ? `0 8px 32px ${themeItem.color}40, 0 0 0 1px ${themeItem.color}30` 
                          : '0 2px 12px rgba(0,0,0,0.08)',
                        '&:hover': {
                          transform: isSelected ? 'scale(1.02)' : 'scale(1.02)',
                          boxShadow: `0 12px 40px ${themeItem.color}30, 0 0 0 1px ${themeItem.color}20`,
                          background: isSelected 
                            ? themeItem.gradient
                            : `linear-gradient(135deg, ${themeItem.color}15, ${themeItem.color}05)`
                        }
                      }}
                      onClick={() => handleThemeChange(themeItem.id)}
                    >
                      <CardContent sx={{ 
                        p: { xs: 1.5, sm: 2, md: 2.5 },
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textAlign: 'center',
                        position: 'relative'
                      }}>
                        {/* 선택 체크마크 */}
                        {isSelected && (
                          <Chip 
                            label="✓" 
                            size="small"
                            sx={{ 
                              position: 'absolute',
                              top: { xs: 6, md: 8 },
                              right: { xs: 6, md: 8 },
                              bgcolor: 'rgba(255,255,255,0.9)',
                              color: themeItem.color,
                              fontWeight: 'bold',
                              fontSize: '0.75rem',
                              minWidth: { xs: '20px', md: '24px' },
                              height: { xs: '20px', md: '24px' },
                              '& .MuiChip-label': {
                                px: 0
                              }
                            }} 
                          />
                        )}
                        
                        {/* 아이콘 */}
                        <Typography 
                          sx={{ 
                            fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                            mb: { xs: 0.5, md: 1 },
                            filter: isSelected ? 'drop-shadow(0 2px 4px rgba(255,255,255,0.3))' : 'none'
                          }}
                        >
                          {themeItem.icon}
                        </Typography>
                        
                        {/* 제목 */}
                        <Typography 
                          variant={isMobile ? "subtitle2" : "h6"}
                          sx={{ 
                            fontWeight: 'bold',
                            mb: { xs: 0.5, md: 1 },
                            color: isSelected ? 'white' : themeItem.color,
                            fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' },
                            lineHeight: 1.2,
                            textShadow: isSelected ? '0 1px 2px rgba(0,0,0,0.2)' : 'none'
                          }}
                        >
                          {themeItem.name}
                        </Typography>
                        
                        {/* 설명 */}
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            fontSize: { xs: '0.65rem', sm: '0.75rem', md: '0.85rem' },
                            lineHeight: 1.3,
                            color: isSelected ? 'rgba(255,255,255,0.9)' : 'text.secondary',
                            textAlign: 'center',
                            display: '-webkit-box',
                            WebkitLineClamp: { xs: 2, md: 3 },
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            textShadow: isSelected ? '0 1px 2px rgba(0,0,0,0.1)' : 'none'
                          }}
                        >
                          {themeItem.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  );
                })}
              </Box>
            </Box>

            {/* 선택된 테마 미리보기 */}
            {selectedThemes.length > 0 && (
              <Paper 
                elevation={2}
                sx={{ 
                  mb: 4, 
                  p: { xs: 2, md: 3 }, 
                  borderRadius: '16px', 
                  background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%)',
                  border: '2px dashed rgba(102, 126, 234, 0.3)'
                }}
              >
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: '#667eea' }}>
                  🎯 선택된 테마
                </Typography>
                <Box sx={{ 
                  display: 'flex', 
                  flexWrap: 'wrap', 
                  gap: 1.5
                }}>
                  {selectedThemes.map(themeId => {
                    const themeItem = pageConst.tripThemes.find(t => t.id === themeId);
                    return themeItem ? (
                      <Chip
                        key={themeId}
                        label={`${themeItem.icon} ${themeItem.name}`}
                        sx={{ 
                          background: themeItem.gradient,
                          color: 'white',
                          fontWeight: 'bold',
                          fontSize: { xs: '0.8rem', md: '0.9rem' },
                          height: { xs: '32px', md: '36px' },
                          '& .MuiChip-deleteIcon': {
                            color: 'rgba(255,255,255,0.8)',
                            '&:hover': {
                              color: 'white'
                            }
                          }
                        }}
                        onDelete={() => handleThemeChange(themeId)}
                      />
                    ) : null;
                  })}
                </Box>
              </Paper>
            )}

            {/* 부가 설명 입력 */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: '#333' }}>
                💭 특별한 요청사항 (선택사항)
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={isMobile ? 3 : 4}
                placeholder="예: 아이와 함께 여행이에요, 사진 찍기 좋은 곳 위주로, 예산은 100만원 정도, 특별한 기념일 여행..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '16px',
                    fontSize: { xs: '0.9rem', md: '1rem' },
                    background: 'rgba(255, 255, 255, 0.9)',
                    '& fieldset': {
                      borderColor: 'rgba(102, 126, 234, 0.2)',
                      borderWidth: '2px'
                    },
                    '&:hover fieldset': {
                      borderColor: 'rgba(102, 126, 234, 0.4)'
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#667eea'
                    }
                  }
                }}
              />
              <Typography 
                variant="caption" 
                color="text.secondary" 
                sx={{ 
                  mt: 1, 
                  display: 'block',
                  fontSize: { xs: '0.75rem', md: '0.875rem' }
                }}
              >
                AI가 더 정확한 여행 계획을 세울 수 있도록 자세히 적어주세요!
              </Typography>
            </Box>

            {/* 완료 버튼 */}
            <Button
              onClick={handleSubmit}
              variant="contained"
              disabled={selectedThemes.length === 0}
              sx={{
                width: '100%',
                height: { xs: '56px', md: '64px' },
                borderRadius: '16px',
                fontSize: { xs: '1.1rem', md: '1.3rem' },
                fontWeight: 'bold',
                background: selectedThemes.length > 0 
                  ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                  : 'rgba(0, 0, 0, 0.12)',
                boxShadow: selectedThemes.length > 0 
                  ? '0 8px 32px rgba(102, 126, 234, 0.4)' 
                  : 'none',
                '&:hover': {
                  background: selectedThemes.length > 0 
                    ? 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)'
                    : 'rgba(0, 0, 0, 0.12)',
                  transform: selectedThemes.length > 0 ? 'translateY(-2px)' : 'none',
                  boxShadow: selectedThemes.length > 0 
                    ? '0 12px 40px rgba(102, 126, 234, 0.5)' 
                    : 'none'
                },
                '&.Mui-disabled': {
                  color: 'rgba(0, 0, 0, 0.26)',
                  background: 'rgba(0, 0, 0, 0.12)',
                },
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
            >
              {selectedThemes.length === 0 
                ? '🎯 여행 테마를 선택해주세요' 
                : `✈️ ${getSelectedThemeNames()} 여행 시작하기!`
              }
            </Button>

            {/* 메인으로 버튼 */}
            {onBack && (
              <Button
                onClick={onBack}
                variant="outlined"
                sx={{
                  width: '100%',
                  height: { xs: '48px', md: '56px' },
                  borderRadius: '16px',
                  fontSize: { xs: '1rem', md: '1.1rem' },
                  fontWeight: 'bold',
                  mt: 2,
                  color: '#667eea',
                  borderColor: '#667eea',
                  '&:hover': {
                    background: 'rgba(102, 126, 234, 0.1)',
                    borderColor: '#5a6fd8',
                    color: '#5a6fd8'
                  },
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
              >
                🏠 메인으로 돌아가기
              </Button>
            )}
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Step0_TripTypeSelection;